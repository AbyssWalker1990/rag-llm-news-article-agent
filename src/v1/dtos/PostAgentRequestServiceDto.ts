import { Request } from 'express'
import RequestServiceDtoInterface from '../interfaces/RequestServiceDtoInterface'

class PostAgentRequestServiceDto implements RequestServiceDtoInterface {
  public query!: string
  public req!: Request
}

export default PostAgentRequestServiceDto
