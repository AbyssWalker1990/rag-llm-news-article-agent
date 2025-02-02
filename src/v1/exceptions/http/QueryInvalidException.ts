import { StatusCodes } from 'http-status-codes'
import ResponseErrorCodeEnum from '../../enums/ResponseErrorCodeEnum'
import AbstractHttpResponseError from '../AbstractHttpResponseError'

class QueryInvalidException extends AbstractHttpResponseError {
  constructor() {
    super(StatusCodes.BAD_REQUEST, {
      code: ResponseErrorCodeEnum.QUERY_INVALID,
      reason: 'Invalid query',
    })
  }
}

export default QueryInvalidException
