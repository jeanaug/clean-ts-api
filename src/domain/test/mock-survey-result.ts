import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'

export const mockSaveSurveyResultData = (): SaveSurveyResultParams => {
  return {
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date(),
  }
}
export const mockSurveyResult = (): SurveyResultModel => Object.assign({}, mockSaveSurveyResultData(), { id: 'any_id' })
