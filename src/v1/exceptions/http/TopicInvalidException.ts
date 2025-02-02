import { StatusCodes } from 'http-status-codes'
import ResponseErrorCodeEnum from '../../enums/ResponseErrorCodeEnum'
import AbstractHttpResponseError from '../AbstractHttpResponseError'

class TopicInvalidException extends AbstractHttpResponseError {
  constructor() {
    super(StatusCodes.BAD_REQUEST, {
      code: ResponseErrorCodeEnum.TOPIC_INVALID,
      reason: 'Invalid topic',
    })
  }
}

export default TopicInvalidException
