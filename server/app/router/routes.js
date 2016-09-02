module.exports = function (express,app,fs,os,formidable,gm,knoxClient,mongoose,io) {

    var Socket;

    io.on('connection', function (socket) {
        Socket = socket;
    })

    var singleImage = new mongoose.Schema({
        filename: String,
        votes:Number
    });

    var singleImageModal = mongoose.model('singleImage',singleImage);

    var router = express.Router();

    router.get('/', function (req,res,next) {
        res.render('index.html')
    })

    router.post('/upload',function (req,res,next) {
        console.log("Upload called..........");

        function generateFileName(filename) {

            var ext_regex = /(?:\.([^.]+))?$/
            var ext = ext_regex.exec(filename)[1];
            var date = new Date().getTime();
            var charBank = "abcdefghijklmnopqrstuvwxyz";
            var fstring = '';
            for (var i = 0 ; i < 15 ; i ++ ){
                fstring += charBank[parseInt(Math.random()*26)];
            }

            return (fstring += date + '.' + ext );
        }

        var tempfile, nfile, fname;

        var newForm = new formidable.IncomingForm();
            newForm.keepExtensions = true;
            newForm.parse(req, function (err, fields , files) {
                tempfile = files.upload.path;
                fname = generateFileName(files.upload.name);
                nfile = os.tmpDir() + '/' + fname;
                res.writeHead(200, {'Content-type':'text/plain'});
                res.end();
            });

            newForm.on('end', function () {
                fs.rename(tempfile,nfile, function () {
                    gm(nfile).resize(300).write(nfile,function () {

                        fs.readFile(nfile,function (err,buf) {
                            var req = knoxClient.put(fname,{
                                'Content-length': buf.length,
                                'Content-Type': 'image/jpeg'
                            });

                            req.on('response', function (res) {
                                if ( res.statusCode == 200 ){
                                    var newImage = new singleImageModal({
                                        filename: fname,
                                        votes:0
                                    }).save();

                                    Socket.emit('status', {'msg':'Saved !!', 'delay':3000});
                                    Socket.emit('doUpdate', {});

                                    fs.unlink(nfile,function () {
                                        console.log('Local file delted');
                                    })
                                }
                            });

                            req.end(buf);
                        });

                    });
                });
            })

    });


    router.get('/getimages',function (req,res,next) {
        singleImageModal.find({},function (err,result) {
            res.send(JSON.stringify(result));
        })
    });


    router.get('/voteup/:id',function (req, res, next) {
        singleImageModal.findOneAndUpdate(req.params.id, {$inc:{votes:1}}, function (err, result) {
            //res.send(200, {votes : result.votes});
            res.status(200).send({votes : result.votes});
        })
    })

    app.use('/',router);
}