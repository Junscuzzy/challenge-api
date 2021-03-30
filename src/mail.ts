import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

const mailOptions: Mail.Options = {
  from: '"Fred Foo 👻" <foo@example.com>',
  to: 'bar@example.com, baz@example.com',
  subject: 'Hello ✔',
  text: 'Hello world?',
  html: '<b>Hello world?</b>'
}

sendMail(mailOptions)

async function sendMail (mailOptions: Mail.Options) {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    })

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions)

    console.log('Message sent: %s', info.messageId)

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (error) {
    console.error('Error in sendMail(): ', error)
  }
}
