import { Resend } from 'resend'

const resend = new Resend(process.env.YAVO_SYSTEM_RESEND_APIKEY)

const emailSender = process.env.YAVO_SYSTEM_EMAIL_SENDER

export const getEmailTest = async ({ toEmail, subject, nameClient }) => {
  const { data, error } = await resend.emails.send({
    from: emailSender,
    to: [toEmail],
    subject,
    html: `
        <p>Se te asigno un ticket para darle seguimiento a 
            <strong>${nameClient}</strong></p>
            <br/>
        <p>Favor de tenerlo presente durante el tiempo indicado</p>`,
  })

  if (error) {
    return console.error({ error })
  }

  //   console.log({ data })
}
