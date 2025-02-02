import { NextFunction, Request, Response } from 'express'
import PostAgentService from '../services/business-logic/PostAgentService'
import PostAgentRequestService from '../services/request-services/PostAgentRequestService'
import LogApiErrorService from '../services/LogApiErrorService'

class PostAgentController {
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await new PostAgentRequestService().handle(req)
      const { status, payload } = await new PostAgentService().handle(dto)

      res.status(status).json({ code: status, data: payload })
    } catch (e: unknown) {
      new LogApiErrorService().handle(e, req)
      next(e)
    }
  }
}

export default PostAgentController
