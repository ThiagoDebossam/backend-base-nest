import { SearchParams } from "../../searchable-repository-contracts "

describe('Searchable repository unit tests', () => {
    describe('SearchParams tests', () => {
        it('page prop', () => {
            const sut = new SearchParams()
            expect(sut.page).toBe(1)

            const params = [
                { page: null, expected: 1 },
                { page: undefined, expected: 1 },
                { page: '', expected: 1 },
                { page: 'teste', expected: 1 },
                { page: 0, expected: 1 },
                { page: -1, expected: 1 },
                { page: 10.1, expected: 1 },
                { page: true, expected: 1 },
                { page: {}, expected: 1 },
                { page: 1, expected: 1 },
                { page: 2, expected: 2 },
                { page: 11, expected: 11 },
            ]

            params.forEach(param => {
                expect(new SearchParams({page: param.page as any}).page).toBe(param.expected)
            })
        })

        it('per page prop', () => {
            const sut = new SearchParams()
            expect(sut.perPage).toBe(15)

            const params = [
                { perPage: null, expected: 15 },
                { perPage: undefined, expected: 15 },
                { perPage: '', expected: 15 },
                { perPage: 'teste', expected: 15 },
                { perPage: 0, expected: 15 },
                { perPage: -1, expected: 15 },
                { perPage: 10.1, expected: 15 },
                { perPage: true, expected: 15 },
                { perPage: {}, expected: 15 },
                { perPage: 1, expected: 1 },
                { perPage: 2, expected: 2 },
                { perPage: 11, expected: 11 },
            ]

            params.forEach(param => {
                expect(new SearchParams({perPage: param.perPage as any}).perPage).toBe(param.expected)
            })
        })
    })
})
