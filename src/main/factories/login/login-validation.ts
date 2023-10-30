import { EmailValidation } from '../../../presentation/helper/validators/email-validation '
import { RequiredFieldValidation } from '../../../presentation/helper/validators/required-field-validation'
import { Validation } from '../../../presentation/helper/validators/validation'
import { ValidationComposite } from '../../../presentation/helper/validators/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  ;['email', 'password'].forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
