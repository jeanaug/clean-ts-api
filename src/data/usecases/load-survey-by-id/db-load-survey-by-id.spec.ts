import { DbLoadSurveyById } from './db-load-survey-by-id'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import MockDate from 'mockdate'

const makeFakeSurvey = (): SurveyResultModel => {
  return {
    id: 'any_id',
    surveyId: 'any_survey_id',
    accountId: 'any_accocunt_id',
    answer: 'any_answer',
    date: new Date(),
  }
}

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    loadById(id: string): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
  return { sut, loadSurveyByIdRepositoryStub }
}
describe('DbLoadSurveysById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveyByIdRepository with correct value', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const spyloadById = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(spyloadById).toHaveBeenCalledWith('any_id')
  })
})