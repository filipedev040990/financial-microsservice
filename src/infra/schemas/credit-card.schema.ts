import { z } from 'zod'

const creditCardSchema = z.object({
  brand: z.string(),
  number: z.string(),
  expiryMonth: z.string(),
  expiryYear: z.string(),
  cvv: z.string()
})

export { creditCardSchema }
