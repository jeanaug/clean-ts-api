import { LoadSurveyByIdRepository } from '../save-survey-result/db-save-survey-result-protocols'
import { LoadSurveyResult, LoadSurveyResultRepository, SurveyResultModel } from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    protected readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    protected readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}
  async load(surveyId: string): Promise<SurveyResultModel> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)

    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map(answer => Object.assign({}, answer, { count: 0, percent: 0 })),
      }
    }
    console.log(surveyResult)

    return surveyResult
  }
}
