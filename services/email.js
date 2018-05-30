const nodemailer = require('nodemailer');
const email = process.env.MAIL_USERNAME;
const password = process.env.MAIL_PASSWORD;
const emailService = process.env.MAIL_SERVICE;

const transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: email,
      pass: password
    }
  });

module.exports = {
    sendEmail: function(req, res){
        return sendEmail(req,res);
    }
};

function sendEmail(req,res) {
    var mailOptions = {
        from: email,
        to: email,
        subject: '[IMPORTANT] Github Page : ' + req.body.queryResult.parameters['param-subject'],
        text: '[From] : '+req.body.queryResult.parameters['param-user']+'\n' +
              '[Email] : '+ req.body.queryResult.parameters['param-email'] +' \n' +
              '[Message] : '+ req.body.queryResult.parameters['param-message'] +' \n' 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log('Email sent: ' + info.response);
          var responseObj = {
              "fulfillmentText" : "Thank you, your message was sent to him.",
          }
          res.json(responseObj);
        }
    });
}