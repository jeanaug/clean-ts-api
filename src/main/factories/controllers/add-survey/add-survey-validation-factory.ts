import { ValidationComposite, RequiredFieldValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  ;['question', 'answers'].forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })
  return new ValidationComposite(validations)
}
