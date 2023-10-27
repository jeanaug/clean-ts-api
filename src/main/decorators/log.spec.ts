import { HttpRequest, HttpResponse } from '../../presentation/protocols'
import { Controller } from '../../presentation/protocols/controller'
import { LogControllerDecorator } from './log'
interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}
const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpRespose = {
        statusCode: 200,
        body: {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@email.com.br',
          password: 'any_password',
        },
      }
      return new Promise(resolve => resolve(httpRespose))
    }
  }
  return new ControllerStub()
}
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub,
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com.br',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
