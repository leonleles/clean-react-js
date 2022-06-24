import { HttpPostClient } from 'domain/data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    class HttpPostClientSy implements HttpPostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url

        return Promise.resolve()
      }
    }

    const url = 'any_url'
    const httpPostClient = new HttpPostClientSy()
    const sut = new RemoteAuthentication(url, httpPostClient)

    await sut.auth()

    expect(httpPostClient.url).toBe(url)
  })
})
