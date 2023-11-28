import {
  LoadSurveyByIdRepository,
  SaveSurveyResult,
  SaveSurveyResultModel,
  SaveSurveyResultRepository,
  SurveyResultModel,
} from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}

  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.loadSurveyByIdRepository.loadById(data.surveyId)
    await this.saveSurveyResultRepository.save(data)
    return new Promise(resolve => resolve(null))
  }
}
