require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require("path");
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

let filename;

const transporter = nodemailer.createTransport({
  name: 'Outlook',
  service: "Outlook365",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAILPASS,
  },
});

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, res, cb) {
      cb(null, "uploads");
    },
    filename: function(req, res, cb) {
      
      cb(null, filename = Date.now() +'.xlsx');
    }
  })
}).single("excelFile");

app.post('/api/v1/sendmail', upload, (req, res) => {
  const subject = req.body.subject;
  const body = req.body.emailBody;
  const wb = xlsx.readFile("./uploads/"+filename);
  const sheetNames = wb.SheetNames;
  let sheet = wb.Sheets[sheetNames[0]];
  const datas = xlsx.utils.sheet_to_json(sheet);
  let email = datas[0].email;
  fs.unlinkSync(`./uploads/${filename}`);
  for(let i =1; i<datas.length; i++){
    email+=","+datas[i].email;
  }
  // console.log(email)
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

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})
