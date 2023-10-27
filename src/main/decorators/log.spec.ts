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
          name: 'jean',
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
        name: 'jean',
      },
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
  test('Should retunr the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'jean',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    console.log('#############################################', httpResponse)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'jean',
      },
    })
  })
})
