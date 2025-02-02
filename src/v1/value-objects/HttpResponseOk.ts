import { StatusCodes } from 'http-status-codes'
import HttpServiceResponseInterface from '../interfaces/HttpServiceResponseInterface'

class HttpResponseOk implements HttpServiceResponseInterface {
  constructor(public readonly payload: object | string | null = null) {}

  get status(): StatusCodes {
    return StatusCodes.OK
  }
}

export default HttpResponseOk
