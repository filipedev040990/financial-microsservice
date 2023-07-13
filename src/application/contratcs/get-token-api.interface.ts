export interface GetTokenInterfaceUseCase {
  execute(key: string): Promise<string>
}
