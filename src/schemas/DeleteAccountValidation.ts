import * as z from 'zod'

export const createDeleteAccountValidationSchema = (username: string) =>
  z.object({
    username: z
      .string()
      .min(1, { message: 'Please enter your username.' })
      .refine((v) => v === username, {
        message: 'Please enter the correct username.'
      }),
    text: z
      .string()
      .min(1, { message: 'Please enter the text.' })
      .refine((v) => v === 'delete my personal account', {
        message: 'Please enter the correct text.'
      })
  })

export type DeleteAccountValidation = {
  username: string
  text: string
}
