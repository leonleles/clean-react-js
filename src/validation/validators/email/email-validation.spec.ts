import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const isValid = sut.validate('')

    expect(isValid).toEqual(new InvalidFieldError())
  })
})
