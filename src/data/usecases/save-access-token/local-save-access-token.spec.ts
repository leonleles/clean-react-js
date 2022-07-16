import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import faker from 'faker'
import { LocalSaveAccessToken } from './local-save-access-token'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { setStorageMock, sut } = makeSut()
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })
  test('Should throw SetStorage throws', async () => {
    const { setStorageMock, sut } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const promisse = sut.save(faker.random.uuid())
    await expect(promisse).rejects.toThrow(new Error())
  })
  test('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut()
    const promisse = sut.save(undefined)
    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })
})
