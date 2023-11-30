import { Controller, HttpRequest, HttpResponse, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor(private readonly saveSurveyResult: SaveSurveyResult) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.saveSurveyResult.save(httpRequest.body)

    return new Promise(resolve => resolve(null))
  }
}
