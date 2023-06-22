import { expressRouteAdapter } from './adapters/express-route.adapter'
import { makeSaveChargeController } from './factories/controllers/save-charge.factory'
import { Router } from 'express'

const router = Router()

router.post('/charge', expressRouteAdapter(makeSaveChargeController()))

export { router }
