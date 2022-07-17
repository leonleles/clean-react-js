import {
  HttpPostParams,
  HttpResponse,
  HttpPostClient
} from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostParams): Promise<HttpResponse> {
    let axioResponse: AxiosResponse

    try {
      axioResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axioResponse = error.response
    }

    return {
      statusCode: axioResponse.status,
      body: axioResponse.data
    }
  }
}
