import { ScoredPineconeRecord } from '@pinecone-database/pinecone'
import assert from 'assert'

import CreatePineconeClientService from './CreatePineconeClientService'
import PineconeMetadataType from '../../types/PineconeMetadataType'
import ParseEnvVariablesService from '../ParseEnvVariablesService'
import GetPineconeVectorByUrlServiceException from '../../exceptions/inner/GetPineconeVectorByUrlServiceException'

class GetPineconeVectorByUrlService {
  constructor(
    private readonly parseEnvVariablesService = new ParseEnvVariablesService(),
    private readonly createPineconeClientService = new CreatePineconeClientService(),
  ) {}

  /**
   * @throws inner/GetPineconeVectorByUrlServiceException
   */
  public async handle(url: string): Promise<ScoredPineconeRecord<PineconeMetadataType>> {
    try {
      const {
        pinecone: { index },
      } = this.parseEnvVariablesService.handle(process.env)

      const client = await this.createPineconeClientService.handle(index)

      const query = await client.query({
        id: url,
        topK: 1,
        includeMetadata: true,
      })

      assert(query.matches !== undefined && query.matches.length > 0)

      return query.matches[0]
    } catch (e) {
      throw new GetPineconeVectorByUrlServiceException()
    }
  }
}

export default GetPineconeVectorByUrlService
