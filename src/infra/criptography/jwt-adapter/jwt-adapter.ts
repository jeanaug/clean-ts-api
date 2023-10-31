import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/criptography/encrypter'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {
    this.secret = secret
  }

  async encrypt(value: string): Promise<string> {
    const token = jwt.sign({ id: value }, this.secret)
    return new Promise(resolve => resolve(token))
  }
}
