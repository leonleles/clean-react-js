import { InvalidFieldError } from '@/validation/errors'
import { MINLengthValidation } from './min-length-validation'

describe('MINLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MINLengthValidation('field', 5)
    const isValid = sut.validate('123')

    expect(isValid).toEqual(new InvalidFieldError())
  })
})
