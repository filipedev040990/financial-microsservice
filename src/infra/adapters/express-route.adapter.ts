import { ControllerInterface } from '@/application/contratcs/controller.interface'
import { HttpRequest, HttpResponse } from '@/shared/types'
import { Request, Response } from 'express'

export const expressRouteAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      body: req.body
    }

    const { statusCode, body }: HttpResponse = await controller.execute(input)
    const bodyOutput = (statusCode > 199 && statusCode < 500) ? body : { error: body.message }

    res.status(statusCode).json(bodyOutput)
  }
}
