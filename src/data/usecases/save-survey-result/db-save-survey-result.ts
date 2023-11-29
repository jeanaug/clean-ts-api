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
    const survey = await this.loadSurveyByIdRepository.loadById(data.surveyId)

    if (survey) {
      const surveyResult = await this.saveSurveyResultRepository.save(data)
      return surveyResult
    }
    return null
  }
}
