import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../usecases/add-account/db-add-account-factorys'
import { makeDbAuthentication } from '../usecases/authentication/db-authentication-factory'
import { makeSigUpValidation } from './signup-validation-factory'

export const makeSigUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSigUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
