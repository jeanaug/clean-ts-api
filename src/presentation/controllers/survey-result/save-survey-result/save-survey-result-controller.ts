import { Controller, HttpRequest, HttpResponse, SaveSurveyResult } from './save-survey-result-controller-protocols'
import { LoadSurveyById } from '@/domain/usecases/survey/load-surveys-by-id'
import { LoadSurveyByIdRepository } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helper/http/http-helper'

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult,
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) return forbidden(new InvalidParamError('surveyID'))

      if (!survey.answers.find(answers => answers.answer === httpRequest.body.answer)) return forbidden(new InvalidParamError('answer'))

      const surveyResult = await this.saveSurveyResult.save(httpRequest.body)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
