import { Collection, MongoClient } from 'mongodb'
export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },
  async disconnect() {
    await this.client.close()
    this.client = null as any
  },

  async isConnected(): Promise<boolean> {
    try {
      await this.client.db().admin().ping()
      return true
    } catch (error) {
      return false
    }
  },
  async getCollection(name: string): Promise<Collection> {
    if (!(await this.isConnected())) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  map(collection: any): any {
    const { _id, ...props } = collection
    return Object.assign({}, { id: _id, ...props })
  },
}
