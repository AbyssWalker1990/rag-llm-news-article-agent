import { Request } from 'express'
import { get } from 'lodash'
import validator from 'validator'
import TopicInvalidException from '../../exceptions/http/TopicInvalidException'

class GetTopicFromBodyService {
  /**
   * @throws parameter-validation/TopicInvalidException
   */
  public handle(req: Request): string {
    const paramValue = get(req.body, 'topic', null)

    const isValid = validator.isAscii(paramValue) && validator.isLength(paramValue, { min: 1, max: 25 })

    if (!isValid) {
      throw new TopicInvalidException()
    }

    return paramValue
  }
}

export default GetTopicFromBodyService
