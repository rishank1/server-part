const express=require('express');
const app=express();
const router=express.Router();
const db=require('./db1');
var MongoClient = require('mongodb').MongoClient;
const fs=require('fs');
const busboy=require('connect-busboy');
const path = require('path');
const Busboy=require('busboy');
const obj1=[
{"id":0,"Title":"Accountant","Description":"Analyze financial information","Location":"Bangalore","Skills":"Mathematics,Active Listening,Monitoring,Critical Thinking","fullDes":"hi"},
{"id":1,"Title":"Advertising Manager","Description":"Plans and executes advertising policies of organization","Location":"Mumbai","Skills":"Good Organisation,Time Management,Communication etc","fullDes":"bi"},
{"id":2,"Title":"Singer","Description":"Holds felt hats over flame","Location":"Bombay","Skills":"Prior Experince in the field","fullDes":"goTo"}
];

router.use(busboy());
router.get('/addjob',  function (req, response) {	
	let collection=db.get().collection('jobs')
	collection.insertMany(obj1,(err,res)=>{
			if(err) throw err;
			response.send('values inserted');
			console.log("values inserted");
		});
});  

router.get('/joblist',function(req,response){
	
	let collection=db.get().collection('jobs');
	collection.find().toArray(function(err,result){
		if(err) throw err;
		response.send({express:result});
	});
});

router.post('/upload', (req, res) => {
	console.log("In upload");
  var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      //var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
	  var saveTo =path.join(process.cwd(), 'my1.pdf')
      file.pipe(fs.createWriteStream(saveTo));
    });
	return req.pipe(busboy);
    });
    /*busboy.on('finish', function() {
      //res.writeHead(200, { 'Connection': 'close' });
      
    });
    	*/
router.post('/upload1', function (req, res) {
    res.send('<html><head></head><body>\
               <form method="POST" enctype="multipart/form-data">\
                <input type="text" name="textfield"><br />\
                <input type="file" name="filefield"><br />\
                <input type="submit">\
              </form>\
            </body></html>');
  res.end();
});


// accept POST request on the homepage

  
  /*let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.pdf`, function(err) {
    if (err) {
      return res.status(500).send(err);
	  console.log("ERROR IN UPLOAD");
    }

    res.json({file: 'uploaded file'});
  


router.post('/upload', upload.single(), function (req, response) {
	let collection=db.get().collection('resumes');
	console.log(req.file);
	let func1 = (count)=> {
		
		collection.insertOne({id:count,name:req.body.name,email:req.body.email,skills:req.body.skills},(err,res)=>{
			if(err) throw err;
			response.send('values inserted');
			console.log("values inserted");
		});
	}
	collection.count({}, function(error, numOfDocs){
		if(error) return callback(error);
		let count=0;
		count=numOfDocs;
		func1(count);
	})*/


module.exports=router;
