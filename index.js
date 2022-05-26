require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require("path");
const fs = require('fs');
const AWS = require('aws-sdk');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

AWS.config.update({
  accessKeyId: process.env.SES_ACCESSKEYID,
  secretAccessKey: process.env.SES_SECRETACCESSKEY,
  region: process.env.REGION,
});

const transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01'
  })
});
  

let filename;

// const transporter = nodemailer.createTransport({
//   name: 'Outlook',
//   service: "gmail",
//   auth: {
//     user: process.env.MAIL,
//     pass: process.env.MAILPASS,
//   },
// });

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

app.get("/api/hello",(req, res) => {
  res.send("hello");
})

app.post('/api/v1/sendmail', upload, async (req, res) => {
  const subject = req.body.subject;
  const body = req.body.emailBody;
  console
  const wb = xlsx.readFile("./uploads/"+filename);
  const sheetNames = wb.SheetNames;
  let sheet = wb.Sheets[sheetNames[0]];
  const datas = xlsx.utils.sheet_to_json(sheet);
  let email = datas[0].email;
  for(let i =1; i<datas.length; i++){
    email+=","+datas[i].email;
  }
  console.log(email)
  let mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: subject,
    html: body
  };
  console.log(mailOptions)
  await transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({
        msg: "Technical Issue!, Please click on resend.",
      });
    }
    else{
      console.log(
        "A email has been sent to " +
        email +""
      );
    }
  });
  fs.unlinkSync(`./uploads/${filename}`);
  res.json("success")
})

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})
