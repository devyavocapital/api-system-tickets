import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El campo email es requerido'],
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'El campo password es requerido'],
    trim: true
  },
  name: {
    type: String,
    required: [true, 'El campo nombre es requerido'],
    trim: true,
    min: [3, 'Debe tener minimo 3 caracteres'],
    max: [30, 'Debe tener máximo 30 caracteres'],
    lowercase: true
  },
  lastname: {
    type: String,
    required: [true, 'El campo apellido es requerido'],
    trim: true,
    min: [3, 'Debe tener minimo 3 caracteres'],
    max: [30, 'Debe tener máximo 30 caracteres'],
    lowercase: true
  },
  motherLastname: {
    type: String,
    trim: true,
    lowercase: true
  },
  category: {
    type: Number,
    required: [true, 'La categoría debe de ser especificada.'],
    min: 1,
    default: 2
  },
  created_At: {
    type: Date,
    default: Date.now()
  }
})

const user =
	mongoose.models.modeluser || mongoose.model('modeluser', UserSchema)

export default user
