import { AuthenticationParams } from 'domain/usecases/authentication'
import { internet, random } from 'faker'
import { AccountModel } from '../models/account-model'

export const mockAuthentication = (): AuthenticationParams => ({
  email: internet.email(),
  password: internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: random.uuid()
})
