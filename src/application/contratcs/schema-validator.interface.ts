export interface SchemaValidatorInterface <T>{
  validate (schema: T, data: T): { success: boolean, error?: any | undefined }
}
