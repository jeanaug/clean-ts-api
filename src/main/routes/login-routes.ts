import { Router } from 'express'
import { makeSigUpController } from '../factories/signup/signup-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSigUpController()))
}