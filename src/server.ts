import app from './app'
import { connectDatabase } from './config/database'

require('dotenv').config()

const port = process.env.PORT || 3000

const connection = connectDatabase()

function startApp () {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port} 🚀`)
  })
}

connection
  .once('open', startApp)
  .on('disconnected', connectDatabase)
  .on('error', console.error)
