import { ScoredPineconeRecord } from '@pinecone-database/pinecone'
import assert from 'assert'

import CreateOpenAIEmbeddingService from './CreateOpenAIEmbeddingService'
import CreatePineconeClientService from './CreatePineconeClientService'
import PineconeMetadataType from '../../types/PineconeMetadataType'
import ParseEnvVariablesService from '../ParseEnvVariablesService'
import PineconeVectorMatchException from '../../exceptions/inner/PineconeVectorMatchException'

class GetPineconeVectorMatchService {
  constructor(
    private readonly parseEnvVariablesService = new ParseEnvVariablesService(),
    private readonly createPineconeClientService = new CreatePineconeClientService(),
    private readonly createOpenAIEmbeddingService = new CreateOpenAIEmbeddingService(),
  ) {}

  /**
   * @throws inner/PineconeVectorMatchException
   */
  public async handle(question: string): Promise<ScoredPineconeRecord<PineconeMetadataType>> {
    try {
      const {
        pinecone: { index },
      } = this.parseEnvVariablesService.handle(process.env)

      const client = await this.createPineconeClientService.handle(index)

      const {
        data: [{ embedding }],
      } = await this.createOpenAIEmbeddingService.handle(question)

      const query = await client.query({
        vector: embedding,
        topK: 1,
        includeMetadata: true,
      })

      assert(query.matches !== undefined && query.matches.length > 0)

      return query.matches[0]
    } catch (e) {
      throw new PineconeVectorMatchException()
    }
  }
}

export default GetPineconeVectorMatchService
