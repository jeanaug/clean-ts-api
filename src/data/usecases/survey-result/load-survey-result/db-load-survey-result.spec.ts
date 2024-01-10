import { mockLoadSurveyByIdRepository, mockLoadSurveyResultRepository } from '@/data/test'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository } from './db-load-survey-result-protocols'
import { mockSurveyResultModel, throwError } from '@/domain/test'
import { LoadSurveyByIdRepository } from '../save-survey-result/db-save-survey-result-protocols'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRespositoryStub: LoadSurveyResultRepository
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRespositoryStub = mockLoadSurveyResultRepository()
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRespositoryStub, loadSurveyByIdRepositoryStub)

  return {
    sut,
    loadSurveyResultRespositoryStub,
    loadSurveyByIdRepositoryStub,
  }
}
describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveyResultRepository ', async () => {
    const { sut, loadSurveyResultRespositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRespositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRespositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRespositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.load('any_survey_id')
    await expect(promise).rejects.toThrow()
  })
  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRespositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRespositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    const surveyResult = await sut.load('any_survey_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
test('Should return surveyResultModel with all answers with count 0 if LoadSurveyResultRepository returns null  ', async () => {
  const { sut, loadSurveyResultRespositoryStub } = makeSut()
  jest.spyOn(loadSurveyResultRespositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
  const surveyResult = await sut.load('any_id')
  expect(surveyResult).toEqual(mockSurveyResultModel())
})

test('Should return surveyResult model on success', async () => {
  const { sut } = makeSut()
  const surveyResult = await sut.load('any_survey_id')
  expect(surveyResult).toEqual(mockSurveyResultModel())
})
