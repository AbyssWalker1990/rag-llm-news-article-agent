import PostVectorDatabaseRequestServiceDto from '../dtos/PostVectorDatabaseRequestServiceDto'
import { Request } from 'express'

class PostVectorDatabaseDtoMapper {
  public map(
    {
      groupIdPrefix,
      topic,
    }: {
      groupIdPrefix: string
      topic: string
    },
    req: Request,
  ): PostVectorDatabaseRequestServiceDto {
    return {
      groupIdPrefix,
      topic,
      req,
    }
  }
}

export default PostVectorDatabaseDtoMapper
