import { Request } from 'express'
import RequestServiceInterface from '../../interfaces/RequestServiceInterface'
import GetKafkaGroupIdPrefixFromBodyService from '../parameter-validation/GetGroupIdPrefixFromBodyService'
import PostVectorDatabaseRequestServiceDto from '../../dtos/PostVectorDatabaseRequestServiceDto'
import PostVectorDatabaseDtoMapper from '../../mappers/PostVectorDatabaseDtoMapper'
import GetTopicFromBodyService from '../parameter-validation/GetTopicFromBodyService'

class PostVectorDatabaseRequestService implements RequestServiceInterface {
  constructor(
    private readonly getKafkaGroupIdPrefixFromBodyService = new GetKafkaGroupIdPrefixFromBodyService(),
    private readonly getTopicFromBodyService = new GetTopicFromBodyService(),
    private readonly mapper = new PostVectorDatabaseDtoMapper(),
  ) {}

  /**
   * @throws parameter-validation/PayloadInvalidException
   */
  public async handle(req: Request): Promise<PostVectorDatabaseRequestServiceDto> {
    const groupIdPrefix = this.getKafkaGroupIdPrefixFromBodyService.handle(req)
    const topic = this.getTopicFromBodyService.handle(req)

    return this.mapper.map({ groupIdPrefix, topic }, req)
  }
}

export default PostVectorDatabaseRequestService
