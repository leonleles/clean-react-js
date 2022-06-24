import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import { mockAuthentication } from '../../../domain/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/erros/invalid-credentials-error'

import { internet } from 'faker'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { UnexpectedError } from '@/domain/erros/unexpected-credentials-error'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
};

const makeSut = (url: string = internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)

    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct BODY', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)

    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Should throw InvalidCredentialsErro if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathourized
    }
    const promisse = sut.auth(mockAuthentication())

    await expect(promisse).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promisse = sut.auth(mockAuthentication())

    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promisse = sut.auth(mockAuthentication())

    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promisse = sut.auth(mockAuthentication())

    await expect(promisse).rejects.toThrow(new UnexpectedError())
  })
})
