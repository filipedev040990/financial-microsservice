import { z } from 'zod'

const clientSchema = z.object({
  identifier: z.string(),
  name: z.string(),
  email: z.string().email(),
  document: z.string(),
  birthDate: z.string(),
  phoneNumber: z.string()
})

export { clientSchema }
