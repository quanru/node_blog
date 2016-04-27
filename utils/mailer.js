const nodemailer = require('nodemailer');
const config = require('../config');
const smtpConfig = config.smtp;

const transporter = nodemailer.createTransport(smtpConfig);

const defaultMail = {
    from: 'quanru <quanru@yeah.net>',
    text: 'hello'
};

export default (mail) => {
    mail = Object.assign({}, defaultMail, mail);

    transporter.sendMail(mail, (err, info) => {
        if(err) return console.log(err);
        console.log('mail sent:', info.response);
    });
};