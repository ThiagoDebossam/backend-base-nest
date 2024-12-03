import { UserOutput } from '@/users/application/dtos/user-output'
import { UsersController } from '../../users.controller'
import { SignUpUseCase } from '@/users/application/usecases/sign-up.usecase'
import { SignUpDto } from '../../dtos/sign-up.dto'
import { SignInUseCase } from '@/users/application/usecases/sign-in.usecase'
import { SignInDto } from '../../dtos/sign-in.dto'
import { UpdateUserUseCase } from '@/users/application/usecases/update-user.usecase'
import { UpdateUserDto } from '../../dtos/update-user.dto'
import { UpdatePasswordUseCase } from '@/users/application/usecases/update-password.usecase'
import { UpdatePasswordDto } from '../../dtos/update-password.dto'
import { GetUserUseCase } from '@/users/application/usecases/get-user.usecase'
import { ListUsersUseCase } from '@/users/application/usecases/list-users.usecase'
import { UserCollectionPresenter, UserPresenter } from '../../presenters/user.presenter'

describe('UsersController unit tests', () => {
    let sut: UsersController
    let id: string
    let props: UserOutput

    beforeEach(async () => {
        sut = new UsersController()
        id = '85147c2a-fee5-418a-8e39-1685a4bda877'
        props = {
            id,
            name: "Thiago",
            email: "teste@gmail.com",
            password: "12345",
            createdAt: new Date()
        }
    })

    it('should be defined', () => {
        expect(sut).toBeDefined()
    })

    it('should create a user', async () => {
        const output: SignUpUseCase.Output = props
        const mockSignUpUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output))
        }
        sut['signUpUseCase'] = mockSignUpUseCase as any
        const input: SignUpDto = {
            name: "Thiago",
            email: "teste@gmail.com",
            password: "12345",
        }
        const presenter = await sut.create(input)
        expect(presenter).toBeInstanceOf(UserPresenter)
        expect(presenter).toStrictEqual(new UserPresenter(output))
        expect(mockSignUpUseCase.execute).toHaveBeenCalledWith(input)
    })

    it('should authenticate a user', async () => {
        const output = 'fake_token'
        const mockSignInUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output))
        }
        const mockAuthService = {
            generateJwt: jest.fn().mockReturnValue(Promise.resolve(output))
        }
        sut['signInUseCase'] = mockSignInUseCase as any
        sut['authService'] = mockAuthService as any
        const input: SignInDto = {
            email: "teste@gmail.com",
            password: "12345",
        }
        const result = await sut.login(input)
        expect(result).toEqual(output)
        expect(mockSignInUseCase.execute).toHaveBeenCalledWith(input)
    })

    it('should update a user', async () => {
        const output: UpdateUserUseCase.Output = props
        const mockUpdateUserUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output))
        }
        sut['updateUserUseCase'] = mockUpdateUserUseCase as any
        const input: UpdateUserDto = {
            name: "Teste"
        }
        const presenter = await sut.update(id, input)
        expect(presenter).toBeInstanceOf(UserPresenter)
        expect(presenter).toStrictEqual(new UserPresenter(output))
        expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({
            id, ...input
        })
    })

    it('should update a user password', async () => {
        const output: UpdatePasswordUseCase.Output = props
        const mockUpdatePasswordUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output))
        }
        sut['updatePasswordUseCase'] = mockUpdatePasswordUseCase as any
        const input: UpdatePasswordDto = {
            password: "Teste",
            oldPassword: "12345"
        }
        const presenter = await sut.updatePassword(id, input)
        expect(presenter).toBeInstanceOf(UserPresenter)
        expect(presenter).toStrictEqual(new UserPresenter(output))
        expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith({
            id, ...input
        })
    })

    it('should delete a user', async () => {
        const output = undefined
        const mockDeleteUserUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output))
        }
        sut['deleteUserUseCase'] = mockDeleteUserUseCase as any
        const result = await sut.remove(id)
        expect(output).toStrictEqual(result)
        expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith({ id })
    })

    it('should gets a user', async () => {
        const output: GetUserUseCase.Output = props
        const mockGetUserUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output))
        }
        sut['getUserUseCase'] = mockGetUserUseCase as any
        const presenter = await sut.findOne(id)
        expect(presenter).toBeInstanceOf(UserPresenter)
        expect(presenter).toStrictEqual(new UserPresenter(output))
        expect(mockGetUserUseCase.execute).toHaveBeenCalledWith({ id })
    })

    it('should list users', async () => {
        const output: ListUsersUseCase.Output = {
            items: [props],
            currentPage: 1,
            perPage: 1,
            lastPage: 1,
            total: 1
        }
        const mockListUsersUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(output))
        }
        sut['listUsersUseCase'] = mockListUsersUseCase as any
        const searchParams = {
            page: 1,
            perPage: 1
        }
        const presenter = await sut.search(searchParams)
        expect(presenter).toBeInstanceOf(UserCollectionPresenter)
        expect(presenter).toEqual(new UserCollectionPresenter(output))
        expect(mockListUsersUseCase.execute).toHaveBeenCalledWith(searchParams)
    })
})
