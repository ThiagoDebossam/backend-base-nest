import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository"
import { GetUserUseCase } from "../../get-user.usecase"
import { NotFoundError } from "@/shared/domain/errors/not-found-error"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"

describe ('GetUserUseCase unit tests', () => {
    let sut: GetUserUseCase.UseCase
    let repository: UserInMemoryRepository

    beforeEach(() => {
        repository = new UserInMemoryRepository()
        sut = new GetUserUseCase.UseCase(repository)
    })

    it('Should throws error when entity not found', async () => {
        await expect(() => sut.execute({id: 'fake'})).rejects.toBeInstanceOf(NotFoundError)
    })

    it('Should be able to get user profile', async () => {
        const spyFinById = jest.spyOn(repository, 'findById')
        const items = [
            new UserEntity(UserDataBuilder({}))
        ]
        repository.items = items

        const result = await sut.execute({id: items[0].id})
        expect(spyFinById).toHaveBeenCalledTimes(1)
        expect(result).toMatchObject({
            id: items[0].id,
            name: items[0].name,
            email: items[0].email,
            password: items[0].password,
            createdAt: items[0].createdAt,
        })
    })
})
