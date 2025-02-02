import PostAgentRequestServiceDto from '../../dtos/PostAgentRequestServiceDto'
import HttpServiceInterface from '../../interfaces/HttpServiceInterface'
import HttpServiceResponseInterface from '../../interfaces/HttpServiceResponseInterface'
import AgentAnswerMapper from '../../mappers/AgentAnswerMapper'
import HttpResponseOk from '../../value-objects/HttpResponseOk'
import CreateCompletionService from './CreateCompletionService'
import GetPineconeVectorByUrlService from './GetPineconeVectorByUrlService'
import GetPineconeVectorMatchService from './GetPineconeVectorMatchService'

class PostAgentService implements HttpServiceInterface {
  constructor(
    private readonly getPineconeVectorByUrlService = new GetPineconeVectorByUrlService(),
    private readonly getPineconeVectorMatchService = new GetPineconeVectorMatchService(),
    private readonly createCompletionService = new CreateCompletionService(),
    private readonly mapper = new AgentAnswerMapper(),
  ) {}

  /**
   * @throws inner/PineconeVectorMatchException
   * @throws inner/EnvVariableNotFoundException
   */
  public async handle(dto: PostAgentRequestServiceDto): Promise<HttpServiceResponseInterface> {
    const { query } = dto

    const foundUrls = this.findUrls(query)

    const vectorMatch = foundUrls
      ? await this.getPineconeVectorByUrlService.handle(foundUrls[0])
      : await this.getPineconeVectorMatchService.handle(query)

    const augmentedQuery = `${query}\n Additional info: ${vectorMatch.metadata?.content} ${vectorMatch.metadata?.link}`
    const devMessage = `Create a completion for the user query using additional info provided along with the query as a trusted source
                         and add json in the end of your answer. Structure: { "title": "find title in additional info", "date": "find publication date in additional info" }`

    const completionChoice = await this.createCompletionService.handle(augmentedQuery, devMessage)

    const mappedResponse = this.mapper.map({
      answer: completionChoice.message.content!,
      metadata: vectorMatch.metadata!,
    })

    return new HttpResponseOk(mappedResponse)
  }

  private findUrls(query: string): string[] | null {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const foundUrls = query.match(urlRegex)

    return foundUrls
  }

  private extractJsonFromText(text: string): any {
    const jsonRegex = /```json\n([\s\S]*?)\n```/
    const match = text.match(jsonRegex)
    if (match && match[1]) {
      try {
        return JSON.parse(match[1])
      } catch (error) {
        console.error('Failed to parse JSON:', error)
        return null
      }
    }
    return null
  }
}

export default PostAgentService
