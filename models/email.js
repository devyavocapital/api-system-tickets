import mongoose from 'mongoose'
import { Resend } from 'resend'
import { urlApi } from '../db/config.js'
import issues from '../schemas/issue.js'
import user from '../schemas/user.js'

const resend = new Resend(process.env.YAVO_SYSTEM_RESEND_APIKEY)

const emailSender = process.env.YAVO_SYSTEM_EMAIL_SENDER

export const sendEmail = async ({ toEmail, subject, task, daysConfig, layout }) => {
  const { error } = await resend.emails.send({
    from: emailSender,
    to: [toEmail],
    subject,
    html: layout
      ? `
        <p>Se te asigno un ticket para darle seguimiento a 
            <strong>${task}</strong></p>
        <p>Favor de tenerlo presente durante el tiempo indicado: Tienes ${daysConfig} días para poder terminar esta tarea.</p>
        `
      : `
        <p>Tarea
            <strong>${task}</strong> no fue completada en el tiempo estimado.</p>
            <p>El tiempo asignado fue de ${daysConfig} días.</p>
            `
  })

  if (error) {
    return console.error({ error })
  }

  //   console.log({ data })
}

export const getEmailRemainder = async () => {
  const today = new Date()
  const toExpired = []
  const leaderMail = process.env.YAVO_SYSTEM_MAIL_LEADER

  try {
    await mongoose.connect(urlApi)
    const allTasks = await issues.find()

    allTasks.map(async task => {
      const created = new Date(task.created_At)
      const createdToMs = created.getTime()
      const newValidateDate = task.daysConfig * (1000 * 60 * 60 * 24)
      const newDate = createdToMs + newValidateDate
      const newDateFull = new Date(newDate)

      const daysValidate = newDateFull - today
      const daysDiference = Math.round(daysValidate / (1000 * 60 * 60 * 24))

      if (daysDiference === 0) {
        const userAssignated = await user.findById({ _id: task.assignTo }).select(['email'])
        sendEmail({ toEmail: userAssignated.email, subject: 'Tarea por expirar', task: task.task, daysConfig: task.daysConfig, layout: true })
        toExpired.push(task)
      }
      if (daysDiference < 0) {
        sendEmail({ toEmail: leaderMail, subject: 'Tarea no terminada', task: task.task, daysConfig: task.daysConfig, layout: false })
        toExpired.push(task)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
