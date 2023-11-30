import { Controller, HttpRequest, HttpResponse, SaveSurveyResult } from './save-survey-result-controller-protocols'
import { ok, serverError } from '@/presentation/helper/http/http-helper'

export class SaveSurveyResultController implements Controller {
  constructor(private readonly saveSurveyResult: SaveSurveyResult) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveyResult = await this.saveSurveyResult.save(httpRequest.body)
      return surveyResult && ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
