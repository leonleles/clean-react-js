import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (field: string): MinLengthValidation =>
  new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const isValid = sut.validate({ [field]: faker.random.alphaNumeric(4) })

    expect(isValid).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const isValid = sut.validate({ [field]: faker.random.alphaNumeric(5) })

    expect(isValid).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const sut = makeSut(faker.database.column())
    const isValid = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })

    expect(isValid).toBeFalsy()
  })
})
