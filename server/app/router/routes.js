module.exports = function (express,app,fs,os,formidable) {
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

                });
            })

    });

    app.use('/',router);
}