import mongoose from 'mongoose'

import config from './config'

const mongoOption: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

export function connectDatabase () {
  mongoose
    .connect(config.mongoURI, mongoOption)
    .then(() => console.log('Connected to MongoDB'))
    .catch(console.error)

  return mongoose.connection
}
