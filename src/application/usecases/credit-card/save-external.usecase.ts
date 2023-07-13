import { SaveCardExternalInterface } from '@/application/contratcs/save-card-external.interface'
import { config } from '@/infra/config'
import axios from 'axios'

export class SaveCardExternal implements SaveCardExternalInterface {
  async execute (creditCard: SaveCardExternalInterface.Input, token: string): Promise<string> {
    const options = {
      method: 'post',
      url: `${config.cardEncryptorUrl}/card`,
      data: creditCard,
      headers: { authorization: `Bearer ${token}` }
    }

    const response = await axios(options)

    return response.data.identifier
  }
}
