var mailer = require('express-mailer');
var path = require('path');
var ejs = require('ejs');
var creds = require('../creds/creds');

module.exports = function(app, express, rootDir) {

  mailer.extend(app, {
    from: 'no-reply@divvy-app.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
      user: creds.email.user,
      pass: creds.email.pass
    }
  });

  app.set('views', path.join(rootDir, 'views'));
  app.set('view engine', 'ejs');

  // MAILER ROUTING

  module.exports.notify = function(metadata) {
    app.mailer.send('email', {
      to: metadata.email, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
      subject: 'Your JobThrust extended search has completed!', // REQUIRED.
      label: metadata.label
    }, function (err) {
      if (err) {
        // handle error
        console.log(err);
        res.send('There was an error sending the email');
        return;
      }
    });
  }

  // this simply renders the e-mail template (views/email.ejs) for easy rendering during editing
  app.get('/mailrender', function (req, res, next) {
    res.end(ejs.renderFile('./views/email.ejs',
    {
      subject: 'Your JobThrust extended search has completed!', // REQUIRED.
      label: 'Software Engineer SF 2017'
    },
    function(err, data) {
      if (err) {
        console.log(err);
      }
      return data;
    }));
  });

}
