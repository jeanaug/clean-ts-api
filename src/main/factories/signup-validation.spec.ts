import { Validation } from '../../presentation/controllers/signup/signup-protocols'
import { CompareFieldsValidation } from '../../presentation/helper/validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentation/helper/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helper/validators/validation-composite'
import { makeSigUpValidation } from './signup-validation'

jest.mock('../../presentation/helper/validators/validation-composite')
describe('SignUpvalidationFactory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeSigUpValidation()

    const validations: Validation[] = []
    ;['name', 'email', 'password', 'passwordConfirmation'].forEach(field => {
      validations.push(new RequiredFieldValidation(field))
    })

    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation'),
    )
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
