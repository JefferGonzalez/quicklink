import * as z from 'zod'

export const ProfileSchema = z.object({
  name: z.string().min(1, { message: 'Please enter a name.' }),
  username: z.string().min(1, { message: 'Please enter a username.' })
})

export type Profile = z.infer<typeof ProfileSchema>
