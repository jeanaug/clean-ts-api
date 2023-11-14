import { forbidden } from '../helper/http/http-helper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
describe('Auth Middleware', () => {
  test('Should returns 403 if no x-acces-token exists in headers ', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({} as any)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
