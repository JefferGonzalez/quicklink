import * as z from 'zod'

export const UserSchema = z.object({
  name: z.string().min(1, { message: 'Please enter a name.' })
})

export type User = z.infer<typeof UserSchema>
