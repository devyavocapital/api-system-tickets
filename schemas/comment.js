import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria.'],
    trim: true
  },
  idIssue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'modelissue',
    required: [true, 'El id de incidencia es necesario.']
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
    required: [true, 'El status es obligatorio.'],
    trim: true
  },
  fileName: {
    type: String,
    trim: true
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

const comments =
	mongoose.models.modelcomment ||
	mongoose.model('modelcomment', CommentSchema)

export default comments
