import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSigUpController } from '@/main/factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSigUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
