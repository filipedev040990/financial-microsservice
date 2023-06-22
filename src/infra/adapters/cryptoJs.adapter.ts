import { DecryptDataInterface } from '@/application/contratcs/decrypt-data.interface'
import { EncryptDataInterface } from '@/application/contratcs/encrypt-data.interface'
import CryptoJS from 'crypto-js'

export class CryptoJsAdapter implements EncryptDataInterface, DecryptDataInterface {
  constructor (private readonly key: string) { }

  encrypt (input: any): string {
    const key = CryptoJS.enc.Utf8.parse(this.key)
    const data = JSON.stringify(input)

    const encryptedData = CryptoJS.AES.encrypt(data, key, {
      mode: CryptoJS.mode.ECB
    })

    return encryptedData.toString()
  }

  decrypt (input: string): any {
    const key = CryptoJS.enc.Utf8.parse(this.key)

    const decryptedData = CryptoJS.AES.decrypt(input, key, {
      mode: CryptoJS.mode.ECB
    })

    return decryptedData.toString(CryptoJS.enc.Utf8)
  }
}
