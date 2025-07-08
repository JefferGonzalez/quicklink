import { Errors } from '@/shared/types/errors'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export const setFormErrors = <T extends FieldValues>(
  form: UseFormReturn<T>,
  errors: Errors<T>[],
  fallbackField = 'root',
  defaultMessage = 'Unknown error'
) => {
  for (const { message, path } of errors) {
    const name = (path?.[0] ?? fallbackField) as Path<T>
    const errorMessage = message || defaultMessage

    form.setError(name, {
      type: 'manual',
      message: errorMessage
    })
  }
}
