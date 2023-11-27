import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}
  async encrypt(value: string): Promise<string> {
    const token = jwt.sign({ id: value }, this.secret)
    return new Promise(resolve => resolve(token))
  }
  async decrypt(token: string): Promise<string> {
    const value = jwt.verify(token, this.secret)
    return new Promise(resolve => resolve(value as any))
  }
}
