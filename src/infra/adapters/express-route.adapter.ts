import { ControllerInterface } from '@/application/contratcs/controller.interface'
import { HttpRequest, HttpResponse } from '@/shared/types'
import { Request, Response } from 'express'

export const expressRouteAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      originalUrl: req?.originalUrl,
      method: req?.method,
      socket: req?.socket,
      ip: req?.ip,
      headers: req?.headers,
      params: req?.params,
      body: req?.body
    }

    const { statusCode, body }: HttpResponse = await controller.execute(input)
    const bodyOutput = (statusCode > 199 && statusCode < 500) ? body : { error: body.message }

    res.status(statusCode).json(bodyOutput)
  }
}
