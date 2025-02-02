import { Request } from 'express'
import RequestServiceDtoInterface from './RequestServiceDtoInterface'

interface RequestServiceInterface {
  handle(req: Request): Promise<RequestServiceDtoInterface>
}

export default RequestServiceInterface
