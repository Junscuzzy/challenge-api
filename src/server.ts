import app from './app'
import config from './config/config'
import { connectDatabase } from './config/database'

const connection = connectDatabase()

function startApp () {
  app.listen(config.port, () => {
    console.log(`App listening at http://localhost:${config.port} 🚀`)
  })
}

connection
  .once('open', startApp)
  .on('disconnected', connectDatabase)
  .on('error', console.error)
