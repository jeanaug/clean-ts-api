export interface LoadSurveys {
  load(): Promise<SurveyModel[] | null>
}
