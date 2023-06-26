export type HttpRequest = {
  originalUrl?: any
  method?: string
  socket?: any
  ip?: any
  headers?: any
  params?: any
  body?: any
}

export type HttpResponse = {
  statusCode: number
  body: any
}
