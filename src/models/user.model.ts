import { prisma } from '../prisma.js'
import { type User } from '@prisma/client'

export const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany()
}

export const getUserById = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (user == null) throw new Error('User not found')

  return user
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  return user
}

export const createUser = async (
  email: string,
  password: string,
  name: string,
  lastName?: string
): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
      lastName
    }
  })

  return user
}

export const updateUser = async (
  id: string,
  email: string,
  password: string,
  name: string,
  lastName?: string
): Promise<User> => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (existingUser == null) {
    throw new Error('User not found')
  } else {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        email,
        password,
        name,
        lastName
      }
    })

    return user
  }
}

export const deleteUser = async (id: string): Promise<User> => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (existingUser == null) {
    throw new Error('User not found')
  } else {
    const user = await prisma.user.delete({
      where: {
        id
      }
    })

    return user
  }
}
