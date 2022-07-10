import faker from 'faker'
import { FieldValidationSpy } from '../test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = ValidationComposite.build(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const [firstFieldValidationSpy, secondFieldValidationSpy] =
      fieldValidationsSpy
    const firstError = faker.random.words()

    firstFieldValidationSpy.error = new Error(firstError)
    secondFieldValidationSpy.error = new Error(faker.random.words())

    const error = sut.validate(fieldName, faker.random.word())

    expect(error).toBe(firstError)
  })

  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, faker.random.words())

    expect(error).toBeFalsy()
  })
})
