import { AddSurvey, Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-protocols'
import { badRequest, noContent, serverError } from '@/presentation/helper/http/http-helper'

export class AddSurveyContoller implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { question, answers } = httpRequest.body
      await this.addSurvey.add({
        question,
        answers,
        date: new Date(),
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
