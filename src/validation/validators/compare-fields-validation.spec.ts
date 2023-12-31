import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}
describe('Compare Field Validattion', () => {
  test('Should return a InvalidParamError if validation fails', async () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value',
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
  test('Should not return if validation succeeds', async () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value',
    })
    expect(error).toBeFalsy()
  })
})
