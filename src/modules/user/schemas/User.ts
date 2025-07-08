import * as z from 'zod'

export const UserSchema = z.object({
  name: z.string().min(1, { message: 'Please enter a name.' }),
  username: z.string().min(1, { message: 'Please enter a username.' })
})

export type User = z.infer<typeof UserSchema>
