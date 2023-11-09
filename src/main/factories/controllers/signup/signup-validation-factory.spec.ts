import { makeSigUpValidation } from './signup-validation-factory'
import { EmailValidator, Validation } from '../../../../presentation/protocols'
import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../presentation/helper/validators'
jest.mock('../../../../presentation/helper/validators/validation-composite')
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
describe('SignUpvalidationFactory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeSigUpValidation()

    const validations: Validation[] = []
    ;['name', 'email', 'password', 'passwordConfirmation'].forEach(field => {
      validations.push(new RequiredFieldValidation(field))
    })

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
