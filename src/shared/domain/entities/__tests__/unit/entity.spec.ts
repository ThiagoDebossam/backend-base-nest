import { validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'

type StubProps = {
    prop1: string,
    prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {

    it('Should set props and id', () => {
        const props = {prop1: 'value1', prop2: 15}
        const entity = new StubEntity(props)

        expect(entity.props).toStrictEqual(props)
        expect(entity.id).not.toBeNull()
        expect(uuidValidate(entity.id)).toBeTruthy()
    })

    it('Should accept a valid uuid', () => {
        const props = {prop1: 'value1', prop2: 15}
        const id = '28bfdd52-15a9-47bc-bec3-7d68568c2cf7'
        const entity = new StubEntity(props, id)

        expect(uuidValidate(entity.id)).toBeTruthy()
        expect(entity.id).toBe(id)
    })

    it('Should accept a valid uuid', () => {
        const props = {prop1: 'value1', prop2: 15}
        const id = '28bfdd52-15a9-47bc-bec3-7d68568c2cf7'
        const entity = new StubEntity(props, id)

        expect(uuidValidate(entity.id)).toBeTruthy()
        expect(entity.id).toBe(id)
    })

    it('Should convert a entity to a JSON', () => {
        const props = {prop1: 'value1', prop2: 15}
        const id = '28bfdd52-15a9-47bc-bec3-7d68568c2cf7'
        const entity = new StubEntity(props, id)
        expect(entity.toJSON()).toStrictEqual({
            id,
            ...props
        })
    })
})
