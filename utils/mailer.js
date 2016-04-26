var nodemailer = require('nodemailer');
var config = require('../config');
var smtpConfig = config.smtp;

var transporter = nodemailer.createTransport(smtpConfig);

var defaultMail = {
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