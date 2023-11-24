import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys'
describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
      loadAll(): Promise<SurveyModel[] | null> {
        return new Promise(resolve => resolve(null))
      }
    }
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
    const spyLoad = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    await sut.load()
    expect(spyLoad).toHaveBeenCalled()
  })
})
