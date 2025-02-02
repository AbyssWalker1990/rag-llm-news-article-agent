import { Request } from 'express'
import { get } from 'lodash'
import validator from 'validator'
import GroupIdPrefixInvalidException from '../../exceptions/http/GroupIdPrefixInvalidException'

class GetGroupIdPrefixFromBodyService {
  /**
   * @throws parameter-validation/GroupIdPrefixInvalidException
   */
  public handle(req: Request): string {
    const paramValue = get(req.body, 'groupIdPrefix', null)

    const isValid = validator.isAscii(paramValue) && validator.isLength(paramValue, { min: 1, max: 80 })

    if (!isValid) {
      throw new GroupIdPrefixInvalidException()
    }

    return paramValue
  }
}

export default GetGroupIdPrefixFromBodyService
