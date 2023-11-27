import { SignUpController } from './signup-controller'
import { AddAccount, AddAccountModel, Authentication, AuthenticationModel, HttpRequest, Validation } from './signup-controller-protocols'
import { AccountModel } from '@/domain/models/account'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper/http/http-helper'

const makeFakeAccount = (): AccountModel => {
  return {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@email.com',
    password: 'valid_password',
  }
}
const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new AddAccountStub()
}
const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null as any
    }
  }

  return new ValidationStub()
}
const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(authentication: AuthenticationModel): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
})
interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}
const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return { sut, addAccountStub, validationStub, authenticationStub }
}

describe('SignUp Controller', () => {
  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null as any)))
  })

  it('Should call AddAccount with correct values ', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    })
  })

  it('Should return 403 if AddAccount returns null ', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  it('Should return 200 if valid data is provided ', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  it('Should call Validation with correct values ', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
  test('Should return 500 if Authentication throws ', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementation(async () => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
