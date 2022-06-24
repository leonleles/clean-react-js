import { AuthenticationParams } from 'domain/usecases'
import { AccountModel } from '../models'

import { internet, random } from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
  email: internet.email(),
  password: internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: random.uuid()
})
