var express = require('express')
var knox = require('knox')
var path = require("path");
var fs = require('fs');
var os = require('os');
var formidable = require('formidable');
var Config = require('./config/development.json');
var mongoose = require('mongoose').connect(Config.dbURL);
var gm = require('gm');

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

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var knoxClient = knox.createClient({
    key: Config.S3AccessKey,
    secret: Config.S3SecretKey,
    bucket: Config.S3BucketKey
});

require('./router/routes')(express,app,fs,os,formidable,gm, knoxClient,mongoose,io);

server.listen(PORT, function () {
    console.log('Photogrid is running on ' + PORT);
})
