import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import MockDate from 'mockdate'
import { Collection } from 'mongodb'
import { AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const makesut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const data = {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    date: new Date(),
  }
  await surveyCollection.insertOne(data)

  return MongoHelper.map(data)
}

const makeAccount = async (): Promise<AccountModel> => {
  const data = {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
  }
  await accountCollection.insertOne(data)
  return MongoHelper.map(data)
}

describe('Mongo Survey Result Repository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(process.env.MONGO_URL as any)
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')

    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
    await surveyResultCollection.deleteMany({})
  })

  describe('Save()', () => {
    test('Should add a survey result if its new ', async () => {
      const sut = makesut()
      const survey = await makeSurvey()
      const account = await makeAccount()

      const saveSurveyResultData = {
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      }
      const surveyResult = await sut.save(saveSurveyResultData)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })
  })
})
