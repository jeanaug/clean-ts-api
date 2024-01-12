import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { makeDbLoadSurveyById } from '../../../usecases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'
import { makeDbLoadSurveyResult } from '@/main/factories/usecases/survey-result/load-survey-result/db-load-survey-result-factorys'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
