var express = require('express')
var knox = require('knox')
var path = require("path");
var fs = require('fs');
var os = require('os');
var formidable = require('formidable');

var app = express();

const PORT = process.env.PORT || 3000;

app.use(function (req,res,next) {
    if ( req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.set('view engine', 'html');
app.use(express.static('builds/client-build'));

require('./router/routes')(express,app,fs,os,formidable);

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Config = require('./config/development.json');

var knoxClient = knox.createClient({
    key: Config.S3AccessKey,
    secret: Config.S3SecretKey,
    bucket: Config.S3BucketKey
});

server.listen(PORT, function () {
    console.log('Photogrid is running on ' + PORT);
})
