import { makeSigUpValidation } from './signup-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factorys'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols'

export const makeSigUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSigUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
