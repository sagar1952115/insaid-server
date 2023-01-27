const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./.env" });

console.log(process.env.USEREMAIL);
console.log(process.env.PASSWORD);
console.log(process.env.RECIEVER);
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.PASSWORD,
  },
});

app.listen(PORT, () => {
  console.log("app is listening");
});

app.use(bodyParser.json());
app.post("/api/sendmail", async (req, res) => {
  console.log(req.body);
  var mailOptions = {
    from: process.env.USEREMAIL,
    to: process.env.RECIEVER,
    subject: "Sending Email from insaid contact us",
    html: `<h3>Name:${req.body.name}</h3><h3>Email:${req.body.email}</h3><p>${req.body.desc}</p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(402).json(error);
    } else {
      res.status(200).json(info.response);
    }
  });
});
