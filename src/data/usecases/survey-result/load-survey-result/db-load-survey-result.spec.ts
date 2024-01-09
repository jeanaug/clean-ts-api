import { mockSurveyResultModel } from '@/domain/test'
import { SurveyResultModel } from '../save-survey-result/db-save-survey-result-protocols'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRespositoryStub: LoadSurveyResultRepository
}

const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRespositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultRespositoryStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRespositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRespositoryStub)

  return {
    sut,
    loadSurveyResultRespositoryStub,
  }
}
describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository ', async () => {
    const { sut, loadSurveyResultRespositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRespositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
