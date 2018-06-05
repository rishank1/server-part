/*var http=require('http');
var mclient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/";
var binary=require('mongodb').Binary;
var fs=require('fs');
var q;
http.createServer(function(req,res){
	fs.readFile('abc.txt', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text'});
	q=data;
    res.write(data);
    res.end('HERE');
	});
}).listen(8080);

var indata={};
indata.filedata=binary(q);
*/
var express=require('express');
var router=express.Router();
var db=require('./db1');
var query={};//specify the particular query
var coll='';//specify the particular collection
var obj1=[{jid:"1", title:"trainee",desc:"budding engineers",locatn:"bangalore"},
			{jid: "2", title:"software developer",desc:"budding engineers", loctn:"bangalore"},
			{jid: "3", title:"game designer",desc:"budding engineers", loctn:"bangalore"},
			{jid: "4", title:"marketeer",desc:"budding engineers" ,loctn:"bangalore"}
			];
var obj2=[{cv:"cv1"},{cv:"cv2"}];

	  router.get('/addjob',  function (req, response) {	
		var collection=db.get().collection('jobs')
		collection.insertMany(obj1,function(err,res){
				if(err) throw err;
				response.send('values inserted');
				console.log("values inserted");
				
			});
		
	  });  
	
	router.get('/findque', function(req,response) {
		var collection=db.get().collection(coll)
		collection.find(query).toArray(function(err,result){
			if(err) throw err;
			response.send(result);
			
		});
	});
		

	
	router.get('/addcv',function(req,response){
		var collection=db.get().collection('resumes')
		collection.insertMany(obj2,function(err,result){
			if(err) throw err;
			response.send('inserted in resumes');
			console.log(result);
		
		});
	});	
	
	
	router.get('/joblist',function(req,response){
		var collection=db.get().collection('jobs');
		collection.find().toArray(function(err,result){
			if(err) throw err;
			response.send(result);
			console.log(result);
		
		});
	  });
	
	module.exports=router;
/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("abc");
  dbo.collection("jobs").find({}).toArray(obj1,function(err,result){
	  if(err) throw err;
	  console.log(result);
	  db.close();
  });
});*/