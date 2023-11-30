import { SaveSurveyResultController } from './save-survey-result-controller'
import { HttpRequest } from './save-survey-result-controller-protocols'
import {
  SaveSurveyResult,
  SaveSurveyResultModel,
  SurveyModel,
  SurveyResultModel,
} from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { LoadSurveyById } from '@/domain/usecases/survey/load-surveys-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helper/http/http-helper'
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
  params: {
    surveyId: 'any_survey_id',
  },
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  date: new Date(),
})

const makeFakeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }

  return new SaveSurveyResultStub()
}
const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyByIdStub {
    loadById(id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSurveyByIdStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  saveSurveyResultStub: SaveSurveyResult
  loadSurveyByIdStub: LoadSurveyById
}
const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const saveSurveyResultStub = makeFakeSaveSurveyResult()
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
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
  test('Should retunr 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(null)
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(forbidden(new InvalidParamError('surveyID')))
  })
  test('Should retunr 403 if answer is ivalid', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const httpRequest = Object.assign({}, makeFakeRequest())
    httpRequest.body.answer = 'other_answer'
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(forbidden(new InvalidParamError('answer')))
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
