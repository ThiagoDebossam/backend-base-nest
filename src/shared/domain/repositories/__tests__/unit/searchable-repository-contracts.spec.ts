import { SearchParams, SearchResult } from "../../searchable-repository-contracts"

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

        it('sort prop', () => {
            const sut = new SearchParams()
            expect(sut.sort).toBeNull()

            const params = [
                { sort: null, expected: null },
                { sort: undefined, expected: null },
                { sort: '', expected: null },
                { sort: 'test', expected: 'test' },
                { sort: 0, expected: '0' },
                { sort: -1, expected: '-1' },
                { sort: 10.1, expected: '10.1' },
                { sort: true, expected: 'true' },
                { sort: {}, expected: '[object Object]' },
                { sort: 1, expected: '1' },
                { sort: 2, expected: '2' },
                { sort: 11, expected: '11' },
            ]

            params.forEach(param => {
                expect(new SearchParams({sort: param.sort as any}).sort).toBe(param.expected)
            })
        })

        it('sortDir prop', () => {
            let sut = new SearchParams()
            expect(sut.sortDir).toBeNull()

            sut = new SearchParams({sort: null})
            expect(sut.sortDir).toBeNull()

            sut = new SearchParams({sort: undefined})
            expect(sut.sortDir).toBeNull()

            sut = new SearchParams({sort: ''})
            expect(sut.sortDir).toBeNull()

            const params = [
                { sortDir: null, expected: 'desc' },
                { sortDir: undefined, expected: 'desc' },
                { sortDir: '', expected: 'desc' },
                { sortDir: 'test', expected: 'desc' },
                { sortDir: 0, expected: 'desc' },
                { sortDir: -1, expected: 'desc' },
                { sortDir: 10.1, expected: 'desc' },
                { sortDir: true, expected: 'desc' },
                { sortDir: {}, expected: 'desc' },
                { sortDir: 1, expected: 'desc' },
                { sortDir: 'asc', expected: 'asc' },
                { sortDir: 'desc', expected: 'desc' },
            ]

            params.forEach(param => {
                expect(new SearchParams({sort: 'field', sortDir: param.sortDir as any}).sortDir).toBe(param.expected)
            })
        })

        it('filter prop', () => {
            const sut = new SearchParams()
            expect(sut.filter).toBeNull()

            const params = [
                { filter: null, expected: null },
                { filter: undefined, expected: null },
                { filter: '', expected: null },
                { filter: 'test', expected: 'test' },
                { filter: 0, expected: '0' },
                { filter: -1, expected: '-1' },
                { filter: 10.1, expected: '10.1' },
                { filter: true, expected: 'true' },
                { filter: {}, expected: '[object Object]' },
                { filter: 1, expected: '1' },
                { filter: 2, expected: '2' },
                { filter: 11, expected: '11' },
            ]

            params.forEach(param => {
                expect(new SearchParams({filter: param.filter as any}).filter).toBe(param.expected)
            })
        })
    })

    describe('SearchResult props', () => {
        it('constructor props', () => {
            let sut = new SearchResult({
                items: ['test1', 'test2', 'test3', 'test4'] as any,
                total: 4,
                currentPage: 1,
                perPage: 2,
                sort: null,
                sortDir: null,
                filter: null
            })
            expect(sut.toJSON()).toStrictEqual({
                items: ['test1', 'test2', 'test3', 'test4'] as any,
                total: 4,
                currentPage: 1,
                perPage: 2,
                lastPage: 2,
                sort: null,
                sortDir: null,
                filter: null
            })

            sut = new SearchResult({
                items: ['test1', 'test2', 'test3', 'test4'] as any,
                total: 4,
                currentPage: 1,
                perPage: 2,
                sort: 'name',
                sortDir: 'asc',
                filter: 'teste'
            })
            expect(sut.toJSON()).toStrictEqual({
                items: ['test1', 'test2', 'test3', 'test4'] as any,
                total: 4,
                currentPage: 1,
                perPage: 2,
                lastPage: 2,
                sort: 'name',
                sortDir: 'asc',
                filter: 'teste'
            })

            sut = new SearchResult({
                items: ['test1', 'test2', 'test3', 'test4'] as any,
                total: 4,
                currentPage: 1,
                perPage: 10,
                sort: 'name',
                sortDir: 'asc',
                filter: 'teste'
            })
            expect(sut.lastPage).toStrictEqual(1)

            sut = new SearchResult({
                items: ['test1', 'test2', 'test3', 'test4'] as any,
                total: 54,
                currentPage: 1,
                perPage: 10,
                sort: 'name',
                sortDir: 'asc',
                filter: 'teste'
            })
            expect(sut.lastPage).toStrictEqual(6)
        })
    })
})
