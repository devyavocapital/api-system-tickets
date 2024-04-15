import { Resend } from 'resend'

const resend = new Resend(process.env.YAVO_SYSTEM_RESEND_APIKEY)

const emailSender = process.env.YAVO_SYSTEM_EMAIL_SENDER

export const getEmailTest = async ({ toEmail, subject, task, daysConfig }) => {
  const { error } = await resend.emails.send({
    from: emailSender,
    to: [toEmail],
    subject,
    html: `
        <p>Se te asigno un ticket para darle seguimiento a 
            <strong>${task}</strong></p>
        <p>Favor de tenerlo presente durante el tiempo indicado: Tienes ${daysConfig} días para poder terminar esta tarea.</p>
        `
  })

  if (error) {
    return console.error({ error })
  }

  //   console.log({ data })
}
