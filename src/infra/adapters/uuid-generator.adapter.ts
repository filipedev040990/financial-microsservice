import { UUIDGeneratorInterface } from '@/application/contratcs/uuid-generator.interface'
import { randomUUID } from 'crypto'

export class UUIDGenerator implements UUIDGeneratorInterface {
  generate (): string {
    return randomUUID()
  }
}
