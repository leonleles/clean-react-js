import { render, RenderResult } from '@testing-library/react'
import React from 'react'
import SignUp from './signup'
import { FormHelper } from '@/presentation/test'

type SutStypes = {
  sut: RenderResult
}

const makeSut = (): SutStypes => {
  const sut = render(
        <SignUp />
  )
  return {
    sut
  }
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    FormHelper.testChildCount(sut,'error-wrap', 0)
    FormHelper.testButtonIsDisabled(sut, 'submit', true)
    FormHelper.testStatusForField(sut, 'name', validationError)
    FormHelper.testStatusForField(sut, 'email', validationError)
    FormHelper.testStatusForField(sut, 'password', validationError)
    FormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
