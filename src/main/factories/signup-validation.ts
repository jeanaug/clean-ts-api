import { Validation } from '../../presentation/controllers/signup/signup-protocols'
import { CompareFieldsValidation } from '../../presentation/helper/validators/compare-fields-validation'
import { EmailValidation } from '../../presentation/helper/validators/email-validation '
import { RequiredFieldValidation } from '../../presentation/helper/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helper/validators/validation-composite'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSigUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  ;['name', 'email', 'password', 'passwordConfirmation'].forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })
  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  )
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
