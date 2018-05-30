const express = require('express');
const emailService = require('./services/email.js');
const fileService = require('./services/file.js');
const aiService = require('./services/ai.js');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('api/checkStatus', function(req,res) {
    res.send('Webservice is available.');
});

app.get('/api/downloadResume', function(req, res){
    fileService.downloadResume(res);
});

app.get('/api/getResumeModifiedDate', function(req,res){
    fileService.getResumeModifiedDate(res);
});

app.get('/api/sendEmail', function(req,res){
    console.log('GET REQUEST');
    emailService.sendEmail(req, res);
});

app.post('/api/sendEmail', function(req,res){
    console.log(req.body.queryResult.parameters);
    emailService.sendEmail(req, res);
});

app.get('/api/talk', function(req, res){
    aiService.talk(req, res);
});

// unavailable apis here
app.get('*', function(req, res){
    res.send('Error 404 : Page not found.', 404);
});

app.listen(port);
console.log("Running server on port " + port);
