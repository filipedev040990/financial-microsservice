import { z } from 'zod'

const creditCardSchema = z.object({
  brand: z.string(),
  number: z.string(),
  monthExpiration: z.string(),
  yearExpiration: z.string()
})

export { creditCardSchema }
