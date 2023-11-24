import { Router } from 'express'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAuthMiddleare } from '../factories/middlewares/auth-middleware-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleare('admin'))
  const auth = adaptMiddleware(makeAuthMiddleare())
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
