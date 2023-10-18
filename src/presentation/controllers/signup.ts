import { MissingParamError } from '../errors/missing-param-erro'
import { badRequest } from '../helper/http-helper'
import { type httpRequest, type httpResponse } from '../protocols/http'

export class SignUpController {
  handle(httpRequest: httpRequest): httpResponse {
    const requiredFields = ['name', 'email', 'password']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: {},
    }
  }
}
