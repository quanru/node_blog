let nodemailer = require('nodemailer');
let config = require('../config');
let smtpConfig = config.smtp;

let transporter = nodemailer.createTransport(smtpConfig);

let defaultMail = {
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