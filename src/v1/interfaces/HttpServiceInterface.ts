import HttpServiceResponseInterface from './HttpServiceResponseInterface'
import RequestServiceDtoInterface from './RequestServiceDtoInterface'

interface HttpServiceInterface {
  handle(dto: RequestServiceDtoInterface): Promise<void | HttpServiceResponseInterface>
}

export default HttpServiceInterface
