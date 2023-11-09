import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { EmailValidator } from '../../../../validation/protocols/email-validator'
jest.mock('../../../../validation/validators/validation-composite')
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
