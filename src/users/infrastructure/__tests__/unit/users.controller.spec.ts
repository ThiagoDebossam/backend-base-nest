import { Test, TestingModule } from '@nestjs/testing'
import { UserOutput } from '@/users/application/dtos/user-output'
import { UsersController } from '../../users.controller'
import { SignUpUseCase } from '@/users/application/usecases/sign-up.usecase'
import { SignUpDto } from '../../dtos/sign-up.dto'

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
            email: "thiagodebossam8@gmail.com",
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
            email: "thiagodebossam8@gmail.com",
            password: "12345",
        }
        const result = await sut.create(input)
        expect(output).toMatchObject(result)
        expect(mockSignUpUseCase.execute).toHaveBeenCalledWith(input)
    })
})
