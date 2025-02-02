import { CreateEmbeddingResponse } from 'openai/resources'
import CreateOpenAIClientService from './CreateOpenAIClientService'
import OpenAIEmbeddingException from '../../exceptions/inner/OpenAIEmbeddingException'

class CreateOpenAIEmbeddingService {
  constructor(private readonly createOpenAIClientService = new CreateOpenAIClientService()) {}

  /**
   * @throws inner/OpenAIEmbeddingException
   */
  public async handle(input: string): Promise<CreateEmbeddingResponse> {
    const client = await this.createOpenAIClientService.handle()

    try {
      return await client.embeddings.create({
        model: 'text-embedding-ada-002',
        input,
      })
    } catch (e) {
      throw new OpenAIEmbeddingException()
    }
  }
}

export default CreateOpenAIEmbeddingService
