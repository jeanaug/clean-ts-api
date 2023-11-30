import { serverError } from '@/presentation/helper/http/http-helper'
import { Controller, HttpRequest, HttpResponse, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor(private readonly saveSurveyResult: SaveSurveyResult) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.saveSurveyResult.save(httpRequest.body)

      return new Promise(resolve => resolve(null))
    } catch (error) {
      return serverError(error)
    }
  }
}
