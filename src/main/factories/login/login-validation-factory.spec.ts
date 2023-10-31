import { RequiredFieldValidation, EmailValidation, ValidationComposite } from '../../../presentation/helper/validators'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { Validation } from '../../../presentation/protocols/validation'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../presentation/helper/validators/validation-composite')
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
describe('LoginValidationFactory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeLoginValidation()

    const validations: Validation[] = []
    ;['email', 'password'].forEach(field => {
      validations.push(new RequiredFieldValidation(field))
    })

    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
