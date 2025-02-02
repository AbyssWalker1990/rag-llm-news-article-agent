import { Request } from 'express'
import PostAgentRequestServiceDto from '../dtos/PostAgentRequestServiceDto'

class PostAgentDtoMapper {
  public map(
    {
      query,
    }: {
      query: string
    },
    req: Request,
  ): PostAgentRequestServiceDto {
    return {
      query,
      req,
    }
  }
}

export default PostAgentDtoMapper
