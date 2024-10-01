import { RepositoryInterface } from "./repository-contracts"
import { Entity } from "../entities/entity"

export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E>{

    items: E[] = []

    async insert(entity: E): Promise<void> {
        this.items.push(entity)
    }

    async findById(id: string): Promise<E> {
        const _id = `${id}`
        const entity = this.items.find(f => f.id === _id)
        if(!entity) {
            throw new Error('Entity not foudn')
        }
        return entity
    }

    async findAll(): Promise<E[]> {
        return [...this.items]
    }

    async update(entity: E): Promise<void> {
        throw new Error("Method not implemented.")
    }

    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.")
    }

}
