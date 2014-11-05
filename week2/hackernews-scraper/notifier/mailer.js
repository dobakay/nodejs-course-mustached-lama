var mailer = (function() {
    'use strict';
    var nodemailer = require('nodemailer');
    var config = require('./mail_config');

    var mailer = {};

    var transporter = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            XOAuth2: {
                user: config.clientAddress,
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                refreshToken: config.refreshToken
            }
        }
    });

    var mailOptions = {
        from: 'Dobata ✔ <' + config.clientAddress + '>', // sender address
        to: config.clientAddress, // list of receivers
        subject: 'HN Scrape Sir ✔', // Subject line
        text: 'Hello world ✔', // plaintext body
        html: '<b>Hello world ✔</b>' // html body
    };

    mailer.mail = function (matchesWithMails) {
        for (var key in matchesWithMails) {
            mailOptions.html = matchesWithMails[key].mailContent.html;
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log('Message sent: ' + info.response);
                }
            });
        }
    }

    return mailer;

}());

module.exports = mailer
