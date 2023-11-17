const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
  
  service: 'gmail',
  auth: {
    user: process.env.SMPT_ALIAS,
    pass: process.env.SMPT_PASS
  }
});
app.use(cors())
app.use(express.json());
app.use(express.static('public'))
app.post('/send-mail', async function (req, res) {
  try {
    console.log(req.body)
    const {sender, subject, body} = req.body
    const info = await transporter.sendMail({
      from: sender, // sender address
      to: "ortizjuandavid@gmail.com", // list of receivers
      subject: `Mensaje desde JuanOrtizDev`, // Subject line
      text: body, // plain text body
      html: `
      <b>mensaje de:</b> <p>${sender}</p>
      <b>asunto:</b> <p>${subject}</p>
      <b>cuerpo del mensaje:</b> <p>${body}</p>
      `, // html body
    });
    console.log(info)
  } catch (error) {
    console.log("Error:", error.message)
  }
  
  res.json({})
})

app.listen(4000,  ()=> {
  console.log(`app ready and listening on http://localhost:4000`)
})