import { StatusCodes } from 'http-status-codes'
import HttpServiceResponseInterface from '../interfaces/HttpServiceResponseInterface'

class HttpResponseCreated implements HttpServiceResponseInterface {
  constructor(public readonly payload: object) {}

  get status(): StatusCodes {
    return StatusCodes.CREATED
  }
}

export default HttpResponseCreated
