import { NextFunction, Request, Response } from 'express'
import { check, sanitize } from 'express-validator'
import jwt from 'jsonwebtoken'

import config from '../config/config'
import User, { addUser, comparePassword, getUserByEmail, UserDocument } from '../models/user'

type ControllerFn = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const register: ControllerFn = async (req, res, next) => {
  // TODO Existing email in database
  await check('email', 'Email is not valid').isEmail().run(req)
  await check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }).run(req)
  await check('confirmPassword', 'Passwords do not match').equals(req.body.password).run(req)
  await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  })

  addUser(newUser, (err, user) => {
    if (err || !user) {
      res.json({ success: false, message: 'Failed to register user' })
    } else {
      res.json({ success: true, message: 'User registered', user: formatUser(user) })
    }
  })
}

export const login: ControllerFn = async (req, res, next) => {
  await check('email', 'Email is not valid').isEmail().run(req)
  await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req)

  // Note: Email is used as username
  const username = req.body.email
  const password = req.body.password

  getUserByEmail(username, (err, user) => {
    if (err) throw err

    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err

      if (isMatch) {
        const token = jwt.sign(user.id, config.secret)

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: formatUser(user)
        })
      } else {
        return res.json({ success: false, message: 'Wrong password' })
      }
    })
  })
}

export const getUser: ControllerFn = async (req, res, next) => {
  const user = req.user as UserDocument
  getUserByEmail(user.email, (err, userDocument) => {
    if (err) throw err

    if (!userDocument) {
      return res.json({ success: false, message: 'User not found' })
    }

    res.json({ success: true, user: formatUser(userDocument) })
  })
}

export const deleteAccount: ControllerFn = async (req, res, next) => {
  const user = req.user as UserDocument
  User.remove({ _id: user.id }, (err) => {
    if (err) { return next(err) }
    req.logout()
    res.json({ success: true, message: 'Your account has been deleted.' })
  })
}

// Utils

// Filter user properties sent to the API
function formatUser (user: UserDocument) {
  return {
    id: user._id,
    email: user.email,
    profile: user.profile
    // password: user.password,
  }
}
