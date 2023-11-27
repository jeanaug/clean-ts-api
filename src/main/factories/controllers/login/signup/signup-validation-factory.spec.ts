import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, CompareFieldsValidation, EmailValidation, ValidationComposite } from '@/validation/validators'
import { EmailValidator } from '@/validation/validators/protocols/email-validator'
import { makeSigUpValidation } from './signup-validation-factory'

jest.mock('@/validation/validators/validation-composite')
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
