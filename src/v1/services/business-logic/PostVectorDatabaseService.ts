import PostVectorDatabaseRequestServiceDto from '../../dtos/PostVectorDatabaseRequestServiceDto'
import HttpServiceInterface from '../../interfaces/HttpServiceInterface'
import HttpServiceResponseInterface from '../../interfaces/HttpServiceResponseInterface'
import HttpResponseCreated from '../../value-objects/HttpResponseCreated'
import ExtractHtmlService from './ExtractHtmlService'
import FormatContentFromHtmlService from './FormatContentFromHtmlService'
import GetKafkaMessagesService from './GetKafkaMessagesService'
import TransformHtmlToJsDomService from './TransformHtmlToJsDomService'
import GetContentFromHtmlService from './GetContentFromHtmlService'
import UpsertRecordToPineconeService from './UpsertRecordToPineconeService'
import CreateOpenAIEmbeddingService from './CreateOpenAIEmbeddingService'

class PostVectorDatabaseService implements HttpServiceInterface {
  constructor(
    private readonly getKafkaMessagesService = new GetKafkaMessagesService(),
    private readonly extractHtmlService = new ExtractHtmlService(),
    private readonly formatContentFromHtmlService = new FormatContentFromHtmlService(),
    private readonly transformHtmlToJsDomService = new TransformHtmlToJsDomService(),
    private readonly getContentFromHtmlService = new GetContentFromHtmlService(),
    private readonly createOpenAIEmbeddingService = new CreateOpenAIEmbeddingService(),
    private readonly upsertRecordToPineconeService = new UpsertRecordToPineconeService(),
  ) {}

  /**
   * @throws inner/CreateOrGetUserServiceException
   */
  public async handle(dto: PostVectorDatabaseRequestServiceDto): Promise<HttpServiceResponseInterface> {
    const { groupIdPrefix, topic } = dto

    const urls = await this.getKafkaMessagesService.handle(groupIdPrefix, topic)

    for (const url of urls) {
      const html = await this.extractHtmlService.handle(url)
      const jsdom = this.transformHtmlToJsDomService.handle(html)
      const content = this.getContentFromHtmlService.handle(jsdom)
      const { answer, extractedMetadata } = await this.formatContentFromHtmlService.handle(JSON.stringify(content))
      const embeddingResponse = await this.createOpenAIEmbeddingService.handle(answer)
      const embedding = embeddingResponse.data[0].embedding

      await this.upsertRecordToPineconeService.handle(url, answer, embedding, extractedMetadata)
    }

    return new HttpResponseCreated({ message: 'Successfully upserted records to Pinecone' })
  }
}

export default PostVectorDatabaseService
