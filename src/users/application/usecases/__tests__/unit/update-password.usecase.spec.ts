import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository"
import { NotFoundError } from "@/shared/domain/errors/not-found-error"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UpdatePasswordUseCase } from "../../update-password.usecase"
import { BcryptjsHashProvider } from "@/users/infrastructure/providers/hash-provider/bcryptjs-hash.provider"
import { HashProvider } from "@/shared/application/providers/hash-provider"
import { InvalidPasswordError } from "@/shared/application/errors/invalid-password-error"

describe ('UpdatePasswordUseCase unit tests', () => {
    let sut: UpdatePasswordUseCase.UseCase
    let repository: UserInMemoryRepository
    let hashProvider: HashProvider

    beforeEach(() => {
        repository = new UserInMemoryRepository()
        hashProvider = new BcryptjsHashProvider()
        sut = new UpdatePasswordUseCase.UseCase(repository, hashProvider)
    })

    it('Should throws error when entity not found', async () => {
        await expect(() => sut.execute({id: 'fake', password: 'fake', oldPassword: 'old fake'})).rejects.toBeInstanceOf(NotFoundError)
    })

    it('Should throws error when old password not provided', async () => {
        const entity = new UserEntity(UserDataBuilder({}))
        repository.items = [entity]
        await expect(() => sut.execute({id: entity.id, password: 'fake', oldPassword: ''})).rejects.toBeInstanceOf(InvalidPasswordError)
    })

    it('Should throws error when password not provided', async () => {
        const entity = new UserEntity(UserDataBuilder({ password: '12345' }))
        repository.items = [entity]
        await expect(() => sut.execute({id: entity.id, password: '', oldPassword: '12345'})).rejects.toBeInstanceOf(InvalidPasswordError)
    })

    it('Should throws error when password different oldPassword', async () => {
        const hashPassword = await hashProvider.generateHash('12345')
        const entity = new UserEntity(UserDataBuilder({ password: hashPassword }))
        repository.items = [entity]
        await expect(() => sut.execute({id: entity.id, password: '123456', oldPassword: '1234'})).rejects.toBeInstanceOf(InvalidPasswordError)
    })

    it('Should update a user password', async () => {
        const spyUpdate = jest.spyOn(repository, 'update')
        const hashPassword = await hashProvider.generateHash('12345')
        const items = [
            new UserEntity(UserDataBuilder({password: hashPassword}))
        ]
        repository.items = items
        const result = await sut.execute({id: items[0].id, password: 'new', oldPassword: '12345'})
        const checkNewPassword = await hashProvider.compareHash('new', result.password)
        expect(spyUpdate).toHaveBeenCalledTimes(1)
        expect(checkNewPassword).toBeTruthy()
    })
})
