import { instanceToPlain } from "class-transformer"
import { UserPresenter } from "../../user.presenter"

describe('UserPresenter unit tests', () => {
    const createdAt = new Date()
    let props = {
        id: '85147c2a-fee5-418a-8e39-1685a4bda877',
        name: 'test name',
        email: 'a@a.com',
        password: 'fake',
        createdAt
    }
    let sut: UserPresenter

    beforeEach(() => {
        sut = new UserPresenter(props)
    })

    describe('constructor', () => {
        it('should be defined', () => {
            expect(sut.id).toEqual(props.id)
            expect(sut.name).toEqual(props.name)
            expect(sut.email).toEqual(props.email)
            expect(sut.createdAt).toEqual(props.createdAt)
        })
    })

    it('should presenter data', () => {
        const output = instanceToPlain(sut)
        expect(output).toStrictEqual({
            id: '85147c2a-fee5-418a-8e39-1685a4bda877',
            name: 'test name',
            email: 'a@a.com',
            createdAt: createdAt.toISOString()
        })
    })

})
