import { z } from 'zod'

const payerSchema = z.object({
  personType: z.string(),
  name: z.string(),
  email: z.string(),
  document: z.string(),
  phoneNumber: z.string(),
  cep: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().nullable(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string()
})

export { payerSchema }
