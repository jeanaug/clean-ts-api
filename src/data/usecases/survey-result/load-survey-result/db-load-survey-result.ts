import { LoadSurveyByIdRepository } from '../save-survey-result/db-save-survey-result-protocols'
import { LoadSurveyResult, LoadSurveyResultRepository, SurveyResultModel } from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    protected readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    protected readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}
  async load(surveyId: string): Promise<SurveyResultModel> {
    let surveyResult: SurveyResultModel = null
    surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)

    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      delete survey['id']
      surveyResult = Object.assign(survey, { surveyId, count: 0, percent: 0 }) as any
    }

    return surveyResult
  }
}
