import { z } from 'zod'

const clientSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  name: z.string(),
  email: z.string().email(),
  document: z.string(),
  birtDate: z.date(),
  phoneNumber: z.string()
})

export { clientSchema }
