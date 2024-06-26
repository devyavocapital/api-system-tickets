import mongoose from 'mongoose'

const IssueSchema = new mongoose.Schema({
  task: {
    type: String,
    trim: true,
    min: 1,
    required: [true, 'Nombre de la tarea es obligatorio.'],
    lowercase: true
  },
  nameClient: {
    type: String,
    trim: true,
    min: 1,
    lowercase: true
  },
  lastnameClient: {
    type: String,
    trim: true,
    lowercase: true
  },
  motherLastnameClient: {
    type: String,
    trim: true,
    lowercase: true
  },
  creditNumber: {
    type: String,
    trim: true
  },
  socialNumber: {
    type: String,
    trim: true
  },
  initialComment: {
    type: String,
    trim: true
  },
  assignTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'modeluser'
  },
  nameAssignated: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    trim: true,
    required: [true, 'El status es obligatorio']
  },
  category: {
    type: String,
    trim: true
  },
  daysConfig: {
    type: Number,
    min: 1,
    required: [
      true,
      'La configuración de días a vencer ticket es obligatoria.'
    ]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'modeluser'
  },
  created_At: {
    type: Date,
    default: Date.now()
  }
})

const issues =
  mongoose.models.modelissue || mongoose.model('modelissue', IssueSchema)

export default issues
