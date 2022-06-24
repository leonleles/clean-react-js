export enum HttpStatusCode {
  noContent = 204,
  unathourized = 401,
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
