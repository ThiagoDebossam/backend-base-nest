export type FieldsErrors = {
    [field: string]: string[]
}

export interface ValidtorFieldsInterface<PropsValidated> {
    errors: FieldsErrors
    validatedData: PropsValidated
    validate(data: any): boolean
}
