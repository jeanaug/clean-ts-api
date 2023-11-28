import { DbSaveSurveyResult } from './db-save-survey-result'
import { LoadSurveyByIdRepository, SaveSurveyResultModel, SaveSurveyResultRepository, SurveyModel, SurveyResultModel } from './db-save-survey-result-protocols'

import MockDate from 'mockdate'

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    save(data: SurveyResultModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new SaveSurveyResultRepositoryStub()
}
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

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    loadById(id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}
const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
  }
}
const makeFakeSaveSurveyResult = (): SaveSurveyResultModel => {
  return {
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date(),
  }
}
const makeFakeSurveyResult = (): SurveyResultModel => {
  return {
    id: 'any_id',
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date(),
  }
}

describe('DbSaveSurveyResult', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveSurveyResultRepository with correct value', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(makeFakeSaveSurveyResult())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSaveSurveyResult())
  })
  test('Should call LoadSurveyByIdRepository with correct value', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.save(makeFakeSaveSurveyResult())
    expect(loadByIdSpy).toHaveBeenCalledWith(makeFakeSaveSurveyResult().surveyId)
  })
})
