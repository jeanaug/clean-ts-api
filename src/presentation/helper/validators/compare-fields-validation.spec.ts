import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../errors'

describe('Required Field Validattion', () => {
  test('Should return a MissinParamError if validation fails', async () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_field' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Should not return if validation succeeds', async () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
