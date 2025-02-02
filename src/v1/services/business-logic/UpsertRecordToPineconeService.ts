import UpsertRecordToPineconeServiceException from '../../exceptions/inner/UpsertRecordToPineconeServiceException'
import ExtractedFromAgentAnswerMetadataType from '../../types/ExtractedFromAgentAnswerMetadataType'
import ParseEnvVariablesService from '../ParseEnvVariablesService'
import CreatePineconeClientService from './CreatePineconeClientService'

class UpsertRecordToPineconeService {
  constructor(
    private readonly parseEnvVariablesService = new ParseEnvVariablesService(),
    private readonly createPineconeClientService = new CreatePineconeClientService(),
  ) {}

  /**
   * @throws inner/UpsertRecordToPineconeServiceException
   */
  public async handle(
    link: string,
    content: string,
    embedding: number[],
    metadata: ExtractedFromAgentAnswerMetadataType,
  ): Promise<void> {
    const {
      pinecone: { index },
    } = this.parseEnvVariablesService.handle(process.env)

    try {
      const client = await this.createPineconeClientService.handle(index)

      const record = {
        id: link,
        values: embedding,
        metadata: {
          ...metadata,
          link,
          content,
        },
      }

      await client.upsert([record])
    } catch (e) {
      throw new UpsertRecordToPineconeServiceException(e)
    }
  }
}

export default UpsertRecordToPineconeService
