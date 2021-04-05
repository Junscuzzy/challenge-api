import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import passport from 'passport'

import passportMiddleware from './config/passport'
import router from './router'

const app = express()

// ✅ Do not allow DNS prefetching
app.use(helmet())

// ✅ Only allow your site to be loading in an iFrame on your own pages.
app.use(helmet.frameguard({ action: 'sameorigin' }))

// ✅ Only allow your site to send the referrer for your own pages
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

// parse json request body
app.use(bodyParser.json())

// parse urlencoded request body into req.body
app.use(bodyParser.urlencoded({ extended: true }))

// Authentication
app.use(passport.initialize())
app.use(passport.session())
passportMiddleware(passport)

// 🚀 gzip/deflate outgoing responses
app.use(compression())

// enable cors
app.use(cors())

// 📃 Logs
app.use(logger('dev'))

// Write custom  middleware
// app.use((req, res, next) => {
//   // Do stuff
// })

// Routes
app.use('/api/v1', router)

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).type('text').send('Not Found ¯\\(ツ)/¯')
})

export default app
