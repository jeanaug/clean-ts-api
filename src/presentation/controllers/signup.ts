import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helper/http-helper'
import {
  Controller,
  EmailValidator,
  httpResponse,
  httpRequest,
} from '../protocols'

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: httpRequest): httpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    try {
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        body: {},
        statusCode: 200,
      }
    } catch (error) {
      return serverError()
    }
  }
}
