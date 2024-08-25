const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,//type of mail system want to use(ex: gmail,yahoo,rediff.....etc)
      auth: {
        user: process.env.MAIL_USER,//company mail address or admin mail address
        pass: process.env.MAIL_PASS,//less secured password that generated from in company mail account
      },
      secure: false,
    })

    let info = await transporter.sendMail({
      from: `"PlacementCell" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers//receiver address
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log(info.response)
    return info
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

module.exports = mailSender
