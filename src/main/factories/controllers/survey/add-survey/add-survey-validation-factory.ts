import { Validation } from '../../../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '../../../../../validation/validators'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  ;['question', 'answers'].forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })
  return new ValidationComposite(validations)
}
