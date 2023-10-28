import { Validation } from '../../presentation/controllers/signup/signup-protocols'
import { RequiredFieldValidation } from '../../presentation/helper/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helper/validators/validation-composite'

export const makeSigUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  ;['name', 'email', 'password', 'passwordConfirmation'].forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })
  return new ValidationComposite(validations)
}
