const http = require('http');
const apiai = require('apiai');
const accessToken = process.env.DIALOGFLOW_ACCESS_KEY;
var ai = apiai(accessToken);

module.exports = {
    talk: function(req, res){
        return talk(req,res);
    }
};

function talk(req,res) {
    var request = ai.textRequest(req.query.msg, {
        sessionId: req.query.sessionId
    });
    request.on('response', function(response) {
        res.send(response);
    });
    request.on('error', function(error) {
        res.send('Unable to communicate with AI Server.');
    });
    request.end();
}

