import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'

export class DbLoadSurveyById implements LoadSurveyByIdRepository {
  constructor(private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}
  async loadById(id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
