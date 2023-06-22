import { z } from 'zod'
import { clientSchema } from './client.shema'
import { payerSchema } from './payer.schema'
import { creditCardSchema } from './credit-card.schema'

const chargeSchema = z.object({
  client: clientSchema,
  payer: payerSchema,
  creditCard: creditCardSchema,
  totalValue: z.number(),
  paymentMethod: z.string()
})

export { chargeSchema }
