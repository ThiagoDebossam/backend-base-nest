import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository"
import { SignInUseCase } from "../../sign-in.usecase"
import { HashProvider } from "@/shared/application/providers/hash-provider"
import { BcryptjsHashProvider } from "@/users/infrastructure/providers/hash-provider/bcryptjs-hash.provider"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { BadRequestError } from "@/shared/application/errors/bad-request-error"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { InvalidCredentialsError } from "@/shared/application/errors/invalid-credentials-error"
import { NotFoundError } from "@/shared/domain/errors/not-found-error"

describe ('SignInUseCase unit tests', () => {
    let sut: SignInUseCase.UseCase
    let repository: UserInMemoryRepository
    let hashProvider: HashProvider

    beforeEach(() => {
        repository = new UserInMemoryRepository()
        hashProvider = new BcryptjsHashProvider()
        sut = new SignInUseCase.UseCase(repository, hashProvider)
    })

    it('Should authenticate a user', async () => {
        const spyFindByEmail = jest.spyOn(repository, 'findByEmail')
        const hashPassword = await hashProvider.generateHash('1234')
        const entity = new UserEntity(UserDataBuilder({ email: 'teste@teste.com', password: hashPassword }))
        repository.items = [entity]
        const result = await sut.execute({
            email: 'teste@teste.com',
            password: '1234'
        })
        expect(spyFindByEmail).toHaveBeenCalledTimes(1)
        expect(result).toStrictEqual(entity.toJSON())
    })

    it('Should throws error when email not provided', async () => {
        const props = {email: null, password: '1234'}
        await expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
    })

    it('Should throws error when password not provided', async () => {
        const props = {email: 'teste@teste.com', password: null}
        await expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
    })

    it('Should not be able to authenticate with wrong email', async () => {
        const props = {email: 'teste@teste.com', password: '1234'}
        await expect(() => sut.execute(props)).rejects.toBeInstanceOf(NotFoundError)
    })

    it('Should throws error when invalid password', async () => {
        const hashPassword = await hashProvider.generateHash('1234')
        const entity = new UserEntity(UserDataBuilder({ email: 'teste@teste.com', password: hashPassword }))
        repository.items = [entity]
        const props = {
            email: 'teste@teste.com',
            password: '12345'
        }
        await expect(() => sut.execute(props)).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
