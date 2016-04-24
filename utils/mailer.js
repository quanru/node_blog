var nodemailer = require('nodemailer');

var config = {
    host: 'smtp.yeah.net',
    port: 25,
    auth: {
        user: 'quanru@yeah.net',
        pass: '***'
    }
};

var transporter = nodemailer.createTransport(config);

var defaultMail = {
    from: 'quanru <quanru@yeah.net',
    text: 'hello'
};

export default (mail) => {
    mail = Object.assign({}, defaultMail, mail);

    transporter.sendMail(mail, (err, info) => {
        if(err) return console.log(err);
        console.log('mail sent:', info.response);
    });
};