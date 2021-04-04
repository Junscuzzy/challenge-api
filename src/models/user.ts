import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

export interface UserDocument extends mongoose.Document {
  email: string
  emailIsVerified: boolean
  createdAt: Date
  updatedAt: Date
  password: string

  profile: {
    name?: string
    gender?: string
    location?: string
    website?: string
    picture?: string
  }
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  emailIsVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  password: { type: String },
  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
})

const User = mongoose.model<UserDocument>('user', userSchema)

type Callback<T> = ((err: mongoose.CallbackError, doc: T | null) => void)

export const getUserById = (id: string, callback:Callback<UserDocument>) => {
  User.findById(id, callback)
}

export const getUserByEmail = (email: string, callback:Callback<UserDocument>) => {
  User.findOne({ email }, callback)
}

export const addUser = (newUser: UserDocument, callback: Callback<UserDocument>) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err

    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err

      newUser.password = hash
      newUser.save(callback)
    })
  })
}

export const comparePassword = (candidatePassword: string, hash: string, callback: Callback<boolean>) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err

    callback(null, isMatch)
  })
}

export default User
