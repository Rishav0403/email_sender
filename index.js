require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());


const transporter = nodemailer.createTransport({
  name: 'Outlook',
  service: "Outlook365",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAILPASS,
  },
});

app.post('/api/v1/sendmail', (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const body = req.body.emailBody;
  let mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: subject,
    html: body
  };
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Technical Issue!, Please click on resend.",
      });
    }
    return res.status(200).send(
      "A email has been sent to " +
      user.email +""
    );
  });
  res.json("success")
})

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})
