import { NextFunction, Request, Response } from 'express'
import PostVectorDatabaseService from '../services/business-logic/PostVectorDatabaseService'
import PostVectorDatabaseRequestService from '../services/request-services/PostVectorDatabaseRequestService'
import LogApiErrorService from '../services/LogApiErrorService'

class PostVectorDatabaseController {
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new PostVectorDatabaseRequestService().handle(req)
      const { status, payload } = await new PostVectorDatabaseService().handle(dto)

      res.status(status).json({ code: status, data: payload })
    } catch (e: unknown) {
      new LogApiErrorService().handle(e, req)
      next(e)
    }
  }
}

export default PostVectorDatabaseController
