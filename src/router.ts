import express from 'express'
import passport from 'passport'

import * as userController from './controllers/user'
import User from './models/user'
const router = express.Router()

const authRoute = passport.authenticate('jwt', { session: false })

// Auth routes
router.post('/register', userController.register)
router.post('/login', userController.login)

// Users
router.get('/user', authRoute, userController.getUser)
router.delete('/user/delete', authRoute, userController.deleteAccount)

// Dev
router.get('/devlist', (req, res, next) => {
  // eslint-disable-next-line array-callback-return
  User.find((err, users) => {
    if (err) next(err)

    res.json({ users })
  })
})

export default router
