import * as z from 'zod'

export const SlugSchema = z.object({
  url: z.string().min(1, { message: 'Please enter a URL.' }).url({
    message: 'Invalid URL'
  }),
  slug: z.string().min(1, {
    message: 'Slug must be at least 1 character or generate a random slug'
  }),
  description: z.string().optional()
})

export type Slug = z.infer<typeof SlugSchema>
