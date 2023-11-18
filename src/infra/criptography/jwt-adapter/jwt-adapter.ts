import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import { Decrypter } from '../../../data/protocols/criptography/decrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}
  async encrypt(value: string): Promise<string> {
    const token = jwt.sign({ id: value }, this.secret)
    return new Promise(resolve => resolve(token))
  }
  async decrypt(value: string): Promise<string> {
    jwt.verify(value, this.secret)
    return null
  }
}
