import { SaveSurveyResultController } from './save-survey-result-controller'
import { HttpRequest } from './save-survey-result-controller-protocols'
import { SaveSurveyResult, SaveSurveyResultModel, SurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { ok, serverError } from '@/presentation/helper/http/http-helper'
import MockDate from 'mockdate'

const makeFakeSaveSurveyResultData = (): SaveSurveyResultModel => {
  return {
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date(),
  }
}
const makeFakeSurveyResult = (): SurveyResultModel => Object.assign({}, makeFakeSaveSurveyResultData(), { id: 'any_id' })

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeSaveSurveyResultData(),
})

const makeFakeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }

  return new SaveSurveyResultStub()
}
type SutTypes = {
  sut: SaveSurveyResultController
  saveSurveyResultStub: SaveSurveyResult
}
const makeSut = (): SutTypes => {
  const saveSurveyResultStub = makeFakeSaveSurveyResult()
  const sut = new SaveSurveyResultController(saveSurveyResultStub)
  return { sut, saveSurveyResultStub }
}
describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call SaveSurveyResult with correct value', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(makeFakeRequest())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
  test('Should retunr 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      }),
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should retunr 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeSurveyResult()))
  })
})
