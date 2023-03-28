const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const smtp_user = process.env.SMTP_USER || "";
const smtp_pass = process.env.SMTP_PASSWORD || "";
const recipient_email = process.env.RECIPIENT_EMAIL || "";
const subject_email = process.env.SUBJECT || "";
// const client_url = process.env.CLIENT_URL || "";

console.log()

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000"
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: smtp_user,
        pass: smtp_pass
    }
});

app.get("/", function (req, res) {
    res.send('Server started');
})

app.post("/sendMessage", async function (req, res) {
    let {email, name, message} = req.body;

    let info = await transporter.sendMail({
        from: process.env.SENDER_APP,
        to: recipient_email,
        subject: subject_email,
        html: `
        <b>Message from my portfolio!!!</b>
        <div>Name: ${name}</div>
        <div>Email: ${email}</div>
        <div>Message: ${message}</div>
        `
    })
    res.send(req.body);
})

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Listening port ${PORT}`)
        });
    } catch (e) {
        console.log(e)
    }
}

start()
