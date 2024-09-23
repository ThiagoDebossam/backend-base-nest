import { FieldsErrors } from "../validators/validtor-fields.interface";

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
    constructor(public error: FieldsErrors) {
        super('Enity Validation Error')
        this.name = 'EntityValidationError'
    }
}
