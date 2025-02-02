import { Request } from 'express'
import RequestServiceDtoInterface from '../interfaces/RequestServiceDtoInterface'

class PostVectorDatabaseRequestServiceDto implements RequestServiceDtoInterface {
  public groupIdPrefix!: string
  public topic!: string
  public req!: Request
}

export default PostVectorDatabaseRequestServiceDto
