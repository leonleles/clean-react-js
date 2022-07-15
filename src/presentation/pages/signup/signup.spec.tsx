import { EmailInUseError } from '@/domain/errors'
import { AddAccountSpy, FormHelper, SaveAccessTokenMock, ValidationStub } from '@/presentation/test'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import SignUp from './signup'

type SutStypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({
  initialEntries: ['/signup']
})

const makeSut = (params?: SutParams): SutStypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const sut = render(
    <Router location="/login" navigator={history}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} saveAccessToken={saveAccessTokenMock} />
        </Router>
  )
  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  FormHelper.populateField(sut,'name', name)
  FormHelper.populateField(sut,'email', email)
  FormHelper.populateField(sut,'password', password)
  FormHelper.populateField(sut,'passwordConfirmation', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.testChildCount(sut,'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'name', validationError)
    FormHelper.testStatusForField(sut, 'email', validationError)
    FormHelper.testStatusForField(sut, 'password', validationError)
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'name')
    FormHelper.testStatusForField(sut, 'name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'email')
    FormHelper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'password')
    FormHelper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    FormHelper.populateField(sut, 'passwordConfirmation')
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut,'name')
    FormHelper.testStatusForField(sut, 'name')
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

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut,'passwordConfirmation')
    FormHelper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    FormHelper.populateField(sut,'name')
    FormHelper.populateField(sut,'email')
    FormHelper.populateField(sut,'password')
    FormHelper.populateField(sut,'passwordConfirmation')
    FormHelper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    FormHelper.testElementExists(sut, 'spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest
      .spyOn(addAccountSpy, 'add')
      .mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)

    await waitFor(() => FormHelper.testElementText(sut, 'main-error', error.message))

    FormHelper.testChildCount(sut, 'error-wrap' , 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
    expect(history.location.pathname).toBe('/')
  })
})
