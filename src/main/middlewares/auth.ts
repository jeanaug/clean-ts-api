import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleare } from '../factories/middlewares/auth-middleware-factory'

export const auth = adaptMiddleware(makeAuthMiddleare())
