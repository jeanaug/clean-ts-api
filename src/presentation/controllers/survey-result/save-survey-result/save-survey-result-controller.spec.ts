import { mockSaveSurveyResultData, mockSurvey, mockSurveyResult, throwError } from '@/domain/test'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { HttpRequest } from './save-survey-result-controller-protocols'
import { SaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { LoadSurveyById } from '@/domain/usecases/survey/load-surveys-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helper/http/http-helper'
import MockDate from 'mockdate'
import { mockLoadSurveyById, mockSaveSurveyResult } from '@/presentation/test'

const mockRequest = (): HttpRequest => ({
  body: mockSaveSurveyResultData(),
  params: {
    surveyId: 'any_survey_id',
  },
  accountId: 'any_account_id',
})

type SutTypes = {
  sut: SaveSurveyResultController
  saveSurveyResultStub: SaveSurveyResult
  loadSurveyByIdStub: LoadSurveyById
}
const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const saveSurveyResultStub = mockSaveSurveyResult()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
  return { sut, saveSurveyResultStub, loadSurveyByIdStub }
}
describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
  test('Should retunr 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(null)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(forbidden(new InvalidParamError('surveyID')))
  })
  test('Should retunr 403 if answer is ivalid', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const httpRequest = Object.assign({}, mockRequest())
    httpRequest.body.answer = 'other_answer'
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(forbidden(new InvalidParamError('answer')))
  })
  test('Should call SaveSurveyResult with correct value', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(mockRequest())
    expect(saveSpy).toHaveBeenCalledWith(mockRequest().body)
  })
  test('Should retunr 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should retunr 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResult()))
  })
})
