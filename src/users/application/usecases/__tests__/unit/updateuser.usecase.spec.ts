import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository"
import { NotFoundError } from "@/shared/domain/errors/not-found-error"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UpdateUserUseCase } from "../../updateuser.usecase"
import { BadRequestError } from "@/shared/application/errors/bad-request-error"

describe ('UpdateUserUseCase unit tests', () => {
    let sut: UpdateUserUseCase.UseCase
    let repository: UserInMemoryRepository

    beforeEach(() => {
        repository = new UserInMemoryRepository()
        sut = new UpdateUserUseCase.UseCase(repository)
    })

    it('Should throws error when entity not found', async () => {
        await expect(() => sut.execute({id: 'fake', name: 'fake'})).rejects.toBeInstanceOf(NotFoundError)
    })

    it('Should throws error when entity name not provided', async () => {
        await expect(() => sut.execute({id: 'fake', name: ''})).rejects.toBeInstanceOf(BadRequestError)
    })

    it('Should update a user', async () => {
        const spyUpdate = jest.spyOn(repository, 'update')
        const items = [
            new UserEntity(UserDataBuilder({}))
        ]
        repository.items = items

        const result = await sut.execute({id: items[0].id, name: 'New name'})
        expect(spyUpdate).toHaveBeenCalledTimes(1)
        expect(result).toMatchObject({
            id: items[0].id,
            name: 'New name',
            email: items[0].email,
            password: items[0].password,
            createdAt: items[0].createdAt,
        })
    })
})
