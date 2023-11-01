import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../presentation/helper/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  ;['email', 'password'].forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}