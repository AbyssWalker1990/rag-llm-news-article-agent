import { StatusCodes } from 'http-status-codes'
import ResponseErrorCodeEnum from '../../enums/ResponseErrorCodeEnum'
import AbstractHttpResponseError from '../AbstractHttpResponseError'

class GroupIdPrefixInvalidException extends AbstractHttpResponseError {
  constructor() {
    super(StatusCodes.BAD_REQUEST, {
      code: ResponseErrorCodeEnum.KAFKA_GROUP_ID_PREFIX_INVALID,
      reason: 'Invalid kafka group id prefix',
    })
  }
}

export default GroupIdPrefixInvalidException
