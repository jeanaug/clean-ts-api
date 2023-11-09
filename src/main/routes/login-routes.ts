import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSigUpController } from '../factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSigUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
