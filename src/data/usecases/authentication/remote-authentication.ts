import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/erros/invalid-credentials-error'
import { HttpPostClient } from 'data/protocols/http/http-post-client'
import { AuthenticationParams } from 'domain/usecases/authentication'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.unathourized: throw new InvalidCredentialsError()
      default: return Promise.resolve()
    }
  }
}
