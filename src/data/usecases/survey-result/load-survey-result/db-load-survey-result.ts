import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SurveyResultModel } from '../save-survey-result/db-save-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(protected readonly loadSurveyResultRespository) {}
  async load(surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRespository.loadBySurveyId(surveyId)
    return null
  }
}
