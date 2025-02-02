import { Request } from 'express'
import { get } from 'lodash'
import validator from 'validator'
import QueryInvalidException from '../../exceptions/http/QueryInvalidException'

class GetQueryFromBodyService {
  /**
   * @throws parameter-validation/QueryInvalidException
   */
  public handle(req: Request): string {
    const paramValue = get(req.body, 'query', null)

    const isValid = validator.isAscii(paramValue) && validator.isLength(paramValue, { min: 5, max: 5000 })

    if (!isValid) {
      throw new QueryInvalidException()
    }

    return paramValue
  }
}

export default GetQueryFromBodyService
