import { DecryptDataInterface } from '@/application/contratcs/decrypt-data.interface'
import { EncryptDataInterface } from '@/application/contratcs/encrypt-data.interface'
import CriptoJS from 'crypto-js'

export class CryptoJsAdapter implements EncryptDataInterface, DecryptDataInterface {
  constructor (private readonly key: string) { }

  encrypt (input: any): string {
    return CriptoJS.AES.encrypt(JSON.stringify(input), this.key).toString()
  }

  decrypt (input: string): any {
    const bytes = CriptoJS.AES.decrypt(input, this.key)
    return JSON.parse(bytes.toString(CriptoJS.enc.Utf8))
  }
}
