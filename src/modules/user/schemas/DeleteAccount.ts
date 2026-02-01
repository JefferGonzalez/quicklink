import * as z from 'zod'

export const getDeleteAccountSchema = (name: string) =>
  z.object({
    name: z
      .string()
      .min(1, { message: 'Please enter your name.' })
      .refine((v) => v === name, {
        message: 'Please enter the correct name.'
      }),
    text: z
      .string()
      .min(1, { message: 'Please enter the text.' })
      .refine((v) => v === 'delete my personal account', {
        message: 'Please enter the correct text.'
      })
  })

export type DeleteAccount = {
  name: string
  text: string
}
