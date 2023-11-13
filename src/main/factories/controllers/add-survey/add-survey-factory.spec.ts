import { Validation } from '../../../../presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
jest.mock('../../../../validation/validators/validation-composite')

describe('AddSurveyValidationFactory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeAddSurveyValidation()

    const validations: Validation[] = []
    ;['question', 'answers'].forEach(field => {
      validations.push(new RequiredFieldValidation(field))
    })

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
