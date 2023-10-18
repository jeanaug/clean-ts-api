import { MissingParamError } from '../errors/missing-param-erro'
import { badRequest } from '../helper/http-helper'
import { type httpRequest, type httpResponse } from '../protocols/http'

export class SignUpController {
  handle(httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    return {
      statusCode: 200,
      body: {},
    }
  }
}
