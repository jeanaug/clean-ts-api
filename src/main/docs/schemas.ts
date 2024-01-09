import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveysSchema,
  surveySchema,
  surveyAnswerSchema,
  signUpParamsSchema,
  surveyResultSchema,
  saveSurveyResultParamsSchema,
  addSurveyParamsSchema,
  surveyResultAnswerSchema,
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  surveyAnswer: surveyAnswerSchema,
  surveyParams: addSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  saveSurveyResultParams: saveSurveyResultParamsSchema,
  surveyResultAnswer: surveyResultAnswerSchema,
}
