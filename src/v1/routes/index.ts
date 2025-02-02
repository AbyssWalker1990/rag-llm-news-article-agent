import { Router } from 'express'
import PostVectorDatabaseController from '../controllers/PostVectorDatabaseController'
import PostAgentController from '../controllers/PostAgentController'

const router = Router()

router.post('/vector-database', new PostVectorDatabaseController().post)
router.post('/agent', new PostAgentController().post)

export default router
