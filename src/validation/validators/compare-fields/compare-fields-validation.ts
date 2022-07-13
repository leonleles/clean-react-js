import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '../../protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate (value: string): Error {
    return value !== this.valueToCompare ? new InvalidFieldError() : null
  }
}
