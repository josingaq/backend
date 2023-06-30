import { type Request, type Response } from 'express'
import { createUser, getUserByEmail } from '../models/user.model.js'
import { encryptPassword } from '../middlewares/index.middleware.js'

export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password, name, lastName } = req.body

    if (email == null) {
      return res.status(400).json({ message: 'Field: email is required' })
    }

    if (password == null) {
      return res.status(400).json({ message: 'Field: password is required' })
    }

    if (name == null) {
      return res.status(400).json({ message: 'Field: name is required' })
    }

    const existingUser = await getUserByEmail(email)

    if (existingUser !== null) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const encryptedPassword = await encryptPassword(password)

    const user = await createUser(email, encryptedPassword, name, lastName)

    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: 86400 // 24 hours
    // })

    return res.status(201).json(user)
  } catch (error: any) {
    console.log(error)

    return res.status(500).json({ message: error.message })
  }
}
