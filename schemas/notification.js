import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Nombre de la tarea'],
    trim: true
  },
  nameClient: {
    type: String,
    trim: true
  },
  assignTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'modeluser'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'modeluser'
  },
  created_At: {
    type: Date,
    default: Date.now()
  },
  readed: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
})

const notifications = mongoose.models.modelnotification || mongoose.model('modelnotification', NotificationSchema)

export default notifications
