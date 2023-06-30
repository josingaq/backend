/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response } from 'express'
import { signup } from '../controllers/auth.controller.js'

const routerAuth = Router()

routerAuth.post('/signin', (req: Request, res: Response): void => {
  res.status(200).json({ message: 'Hello World!' })
})

routerAuth.post('/signup', signup)

export { routerAuth }
