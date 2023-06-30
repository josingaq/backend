import { Router } from 'express'
import { routerAuth } from './auth.routes.js'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' })
})

router.use('/api/v1', routerAuth)

export { router }
