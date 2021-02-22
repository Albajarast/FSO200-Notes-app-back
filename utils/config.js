require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_USER = process.env.MONGODB_USER

module.exports = {
  MONGODB_URI,
  MONGODB_USER,
  PORT
}
