import { z } from 'zod'

export const createPowersSchema = () =>
  z.object({
    powers: z.array(
      z.object({
        owner: z.string().min(1, 'Wallet address is required'),
        votePower: z.string().min(1, 'Required'),
      }),
    ),
  })

export type CreatePowersSchemaType = z.infer<ReturnType<typeof createPowersSchema>>
