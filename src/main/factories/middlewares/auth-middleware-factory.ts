import { makeDbLoadAccountByToken } from '../usecases/account/load-accout-by-token/db-load-account-by-token-factory'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

import { Middleware } from '@/presentation/protocols'

export const makeAuthMiddleare = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
