import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import faker from 'faker'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.random.word())
    const isValid = sut.validate(faker.random.word())

    expect(isValid).toEqual(new InvalidFieldError())
  })
  test('Should return falsy if email is invalid', () => {
    const sut = new EmailValidation(faker.random.word())
    const isValid = sut.validate(faker.internet.email())

    expect(isValid).toBeFalsy()
  })
})
