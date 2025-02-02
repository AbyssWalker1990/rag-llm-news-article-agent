import { Index, Pinecone, RecordMetadata } from '@pinecone-database/pinecone'
import ParseEnvVariablesService from '../ParseEnvVariablesService'

class CreatePineconeClientService {
  constructor(private readonly parseEnvVariablesService = new ParseEnvVariablesService()) {}

  public async handle(pineconeIndex: string): Promise<Index<RecordMetadata>> {
    const {
      pinecone: { apiKey },
    } = this.parseEnvVariablesService.handle(process.env)

    const configuration = {
      apiKey,
    }

    return new Pinecone(configuration).index(pineconeIndex)
  }
}

export default CreatePineconeClientService
