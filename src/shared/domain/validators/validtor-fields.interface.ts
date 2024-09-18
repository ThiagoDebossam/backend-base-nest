export type FieldsErrors = {
    [field: string]: string[]
}

export interface ValidtorFieldInterface<PropsValidated> {
    errors: FieldsErrors
    validatedData: PropsValidated
    validate(data: any): boolean
}
