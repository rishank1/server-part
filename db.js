module.exports={
 url1: function(){ return "mongodb://localhost:27017/"},
 connect1: function(url){
			var MongoClient=require('mongodb').MongoClient;
			MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
			if (err) {return "error"}
			else{
					console.log("Success"+db);
			return db}
			});
			
			}
	
 


}
