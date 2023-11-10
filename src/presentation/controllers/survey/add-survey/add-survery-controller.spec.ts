import { AddSurveyContoller } from './add-survey-controller'
import { HttpRequest, Validation } from './add-survey-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
  },
})
describe('AddSurvery Controller', () => {
  test('Should call Validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate(input: any): Error {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const sut = new AddSurveyContoller(validationStub)
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
