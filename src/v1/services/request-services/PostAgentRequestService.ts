import { Request } from 'express'
import RequestServiceInterface from '../../interfaces/RequestServiceInterface'
import PostAgentDtoMapper from '../../mappers/PostAgentDtoMapper'
import GetQueryFromBodyService from '../parameter-validation/GetQueryFromBodyService'
import PostAgentRequestServiceDto from '../../dtos/PostAgentRequestServiceDto'

class PostAgentRequestService implements RequestServiceInterface {
  constructor(
    private readonly getQueryFromBodyService = new GetQueryFromBodyService(),
    private readonly mapper = new PostAgentDtoMapper(),
  ) {}

  /**
   * @throws parameter-validation/QueryInvalidException
   */
  public async handle(req: Request): Promise<PostAgentRequestServiceDto> {
    const query = this.getQueryFromBodyService.handle(req)

    return this.mapper.map(
      {
        query,
      },
      req,
    )
  }
}

export default PostAgentRequestService
