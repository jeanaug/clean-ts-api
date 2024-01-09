import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import MockDate from 'mockdate'
import { Collection, ObjectId } from 'mongodb'
import { AccountModel } from '@/domain/models/account'
import { SurveyResultModel } from '@/domain/models/survey-result'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const surveyParam = {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer_1',
      },
      {
        answer: 'any_answer_2',
      },
      {
        answer: 'any_answer_3',
      },
    ],
    date: new Date(),
  }
  const res = await surveyCollection.insertOne(surveyParam)

  return Object.assign(surveyParam, { id: res.insertedId.toString() }) as SurveyModel
}

const makeSurveyResult = async (survey: SurveyModel, account: AccountModel): Promise<SurveyResultModel> => {
  const saveSurveyResultData = {
    surveyId: survey.id,
    accountId: account.id,
    answer: survey.answers[0].answer,
    date: new Date(),
  }

  await surveyResultCollection.insertOne(saveSurveyResultData)

  return MongoHelper.map(saveSurveyResultData)
}

const makeAccount = async (): Promise<AccountModel> => {
  const data = {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
  }
  await accountCollection.insertOne(data)
  return MongoHelper.map(data)
}

describe('Survey Result Mongo Repository', () => {
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
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()

      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId.toString()).toEqual(survey.id)
      expect(surveyResult.answers[0].answer).toBe(survey.answers[0].answer)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
    })
  })
  test('Should update an exists survey result', async () => {
    const survey = await makeSurvey()
    const account = await makeAccount()
    await surveyResultCollection.insertOne({
      surveyId: new ObjectId(survey.id),
      accountId: new ObjectId(account.id),
      answer: survey.answers[0].answer,
      date: new Date(),
    })
    const sut = makeSut()

    const surveyResult = await sut.save({
      surveyId: survey.id,
      accountId: account.id,
      answer: survey.answers[1].answer,
      date: new Date(),
    })

    expect(surveyResult).toBeTruthy()
    expect(surveyResult.surveyId.toString()).toEqual(survey.id)
    expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer)
    expect(surveyResult.answers[0].count).toBe(1)
    expect(surveyResult.answers[0].percent).toBe(100)
  })
})
