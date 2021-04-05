require('dotenv').config()

const config = {
  mongoURI: 'mongodb://localhost/test',
  secret: 's3cr3t',
  port: process.env.PORT || 3333
}

export default config
