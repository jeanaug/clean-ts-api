import { LoadSurveyResultController } from './load-survey-result-controller'
import { mockLoadSurveyById } from '@/presentation/test'
import { HttpRequest, LoadSurveyById } from './load-survey-result-controller-protocols'
import { forbidden, serverError } from '@/presentation/helper/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { throwError } from '@/domain/test'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
})

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}
const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)

  return {
    sut,
    loadSurveyByIdStub,
  }
}
describe('LoadSurveyResultController Controller', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 403 if LoadSurveyById retunrs null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})