import { mockValidation } from './test'
import { ValidationComposite } from './validation-composite'
import { Validation } from '@/presentation/protocols/validation'
import { MissingParamError } from '@/presentation/errors'

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs,
  }
}
describe('Validation Composite', () => {
  test('Should return a error if any validation fails', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ filed: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Should return the first error if more then one validation fails', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ filed: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should not return  if  validation succeeds', async () => {
    const { sut } = makeSut()
    const error = sut.validate({ filed: 'any_value' })
    expect(error).toBeFalsy()
  })
})
