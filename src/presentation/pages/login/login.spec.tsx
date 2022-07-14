// import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'
// import { AuthenticationSpy, ValidationStub } from '@/domain/errors'
import { AuthenticationSpy, ValidationStub, FormHelper } from '@/presentation/test'
import { SaveAccessTokenMock } from '@/presentation/test/mock-save-access-token'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({
  initialEntries: ['/login']
})

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router location="/login" navigator={history}>
      <Login
      validation={validationStub}
      authentication={authenticationSpy}
      saveAccessToken={saveAccessTokenMock}
       />
    </Router>
  )
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField(sut,'email', email)
  FormHelper.populateField(sut,'password', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

// const testElementText = (
//   sut: RenderResult,
//   fieldName: string,
//   text: string
// ): void => {
//   const element = sut.getByTestId(fieldName)
//   expect(element.textContent).toBe(text)
// }

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.testChildCount(sut,'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'email', validationError)
    FormHelper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut,'email')
    FormHelper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut,'password')
    FormHelper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut,'email')
    FormHelper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut,'password')
    FormHelper.testStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut,'email')
    FormHelper.populateField(sut,'password')
    FormHelper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  // test('Should present error if Authentication fails', async () => {
  //   const { sut, authenticationSpy } = makeSut()
  //   const error = new InvalidCredentialsError()
  //   jest
  //     .spyOn(authenticationSpy, 'auth')
  //     .mockReturnValueOnce(Promise.reject(error))
  //   await simulateValidSubmit(sut)
  //   testElementText(sut, 'main-error', error.message)
  //   testErrorWrapChieldCount(sut, 1)
  // })

  // test('Should present error if SaveAccessToken fails', async () => {
  //   const { sut, saveAccessTokenMock } = makeSut()
  //   const error = new InvalidCredentialsError()
  //   jest
  //     .spyOn(saveAccessTokenMock, 'save')
  //     .mockReturnValueOnce(Promise.reject(error))
  //   await simulateValidSubmit(sut)
  //   testElementText(sut, 'main-error', error.message)
  //   testErrorWrapChieldCount(sut, 1)
  // })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    // expect(history.length).toBe(1)
    // expect(history.location.pathname).toBe('/')
  })

  // test('Should go to signup page', () => {
  //   const { sut } = makeSut()

  //   const register = sut.getByTestId('signup')
  //   fireEvent.click(register)
  //   expect(history.length).toBe(2)
  //   expect(history.location.pathname).toBe('/signup')
  // })
})
