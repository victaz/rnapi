// import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const roles = ['user', 'admin']

const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  }
}, {
  timestamps: true
})


userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view (full) {
    let view = {}
    let fields = ['id', 'name', 'picture']

    if (full) {
      fields = [...fields, 'email', 'createdAt', 'role']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }
}

userSchema.statics = {
  roles
}

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
