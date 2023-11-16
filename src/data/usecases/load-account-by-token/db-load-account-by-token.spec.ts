import { Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

interface SutTypes {
  sut: DbLoadAccountByToken
  dcrypterStub: Decrypter
}
const makeDecripter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const dcrypterStub = makeDecripter()
  const sut = new DbLoadAccountByToken(dcrypterStub)
  return { sut, dcrypterStub }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, dcrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(dcrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
