import { DeleteCardExternalInterface } from '@/application/contratcs/delete-card-external.interface'
import { config } from '@/infra/config'
import axios from 'axios'

export class DeleteCardExternal implements DeleteCardExternalInterface {
  async execute (externalIdentifier: string, token: string): Promise<void> {
    const options = {
      method: 'delete',
      url: `${config.cardEncryptorUrl}/card/${externalIdentifier}`,
      headers: { authorization: `Bearer ${token}` }
    }

    await axios(options)
  }
}
