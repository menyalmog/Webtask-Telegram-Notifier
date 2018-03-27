'use latest';

const request = require('request');

const baseURL = 'https://api.telegram.org/bot';
let token, chat_id, from, received_at, subject, body, message;

/**
* @param context {WebtaskContext}
*/
module.exports = function(context, cb) {
  token = context.secrets.BOT_TOKEN;
  chat_id = context.secrets.CHAT_ID;
  
  if (contest.body && contest.body.from) {
    from = context.body.from;
    received_at = context.body.received_at;
    subject = context.body.subject;
    body = context.body.body.trimLeft();
    message = `From: ${from}
    Received at: ${received_at}
    Subject: ${subject}
    Body: ${body}`;
    
    request.get(`${baseURL}${token}/sendMessage?chat_id=${chat_id}&text=${message}`, (err, res, body) => {
      if (err) return cb(err);
  
      return cb(null, {notification: 'success'});
    });
  } else {
    return cb('Error: make sure to POST the following fields { from, received_at, subject, body }"')
  }
};