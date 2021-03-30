import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'

import router from './router'

const app = express()

// ✅ Do not allow DNS prefetching
app.use(helmet())

// ✅ Only allow your site to be loading in an iFrame on your own pages.
app.use(helmet.frameguard({ action: 'sameorigin' }))

// ✅ Only allow your site to send the referrer for your own pages
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

// parse json request body
app.use(express.json())

// parse urlencoded request body into req.body
app.use(express.urlencoded({ extended: true }))

// 🚀 gzip/deflate outgoing responses
app.use(compression())

// enable cors
app.use(cors())

// 📃 Logs
app.use(logger('dev'))

// Routes
app.use('/api', router)

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).type('text').send('Not Found ¯\\(ツ)/¯')
})

export default app
