const express = require('express');
const app = express();

// Must match up with /etc/nginx/frameworks-available/nodejs.conf!
const port = 8081;

// Required for running behind ngx
app.set('trust proxy', 'loopback');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/login";


function insertStudent(res, name, email, password, type, school, classnum){
	MongoClient.connect(url, function(err, db) {
	var dbo = db.db("login");
	dbo.collection("details").find({}, {'id':1}).limit(1).sort({$natural:-1}).toArray(function(err, result){
		retrievedID = result[0].id;
		retrievedID++;
		console.log(retrievedID);
		console.log(typeof(retrievedID));
		retrievedEmail = result[0].email;
		if(!(retrievedEmail === email)){
			dbo.collection('details').insertOne(
				{
					id:retrievedID,
					name:name,
					email:email,
					password:password,
					type:type,
					school:school,
					class:classnum
				}
			);
		}
		else{
			res.send('email already registered');
		}
		db.close();
	});
	
});
}

function login(res, email, password){
        MongoClient.connect(url, function(err, db) {
        	var dbo = db.db('login');
        	dbo.collection('details').find({email: email} ).toArray(function(err,result){
        		if(result[0].password === password){
				res.send('correct password');
			}else{
				res.send('incorrect password');
			}
		});
		db.close();
        });
}

function addBook(bookTitle, bookCoverLink, school, classID){
	MongoClient.connect(url, function(err, db) {
		var dbo = db.db('books');
		dbo.collection('book').find({}, {'bookId':1}).limit(1).sort({$natural:-1}).toArray(function(err, result){
			var nextID = result[0].bookId;
			nextID++;
			console.log(nextID);
			console.log(result);
			dbo.collection('book').insertOne({
                        bookId:nextID,
                        bookTitle:bookTitle,
                        bookCoverLink:bookCoverLink,
                        school:school,
                        classID:classID,
                        pages:[]
                });	
		});
	});
}

function addPage(bookID, page){
	MongoClient.connect(url, function(err, db) {
		var dbo = db.db('books');
		/*dbo.collection('book').find({bookId:bookID}).toArray(function(err, result){
			
		});*/
		dbo.book.update(
		
			{bookId:bookID},
			{$push:{pages:page}}
		
		)
	});
}

app.get('/book', function(req, res){
	addBook(req.query.bookTitle,req.query.bookCoverLink,req.query.school,req.query.classID);
	res.send(req.query.bookID);
})


app.post('/login', function (req, res){
	login(res, req.query.email, req.query.password);

})
app.post('/register', function (req, res){
	console.log('got reg req g respect');
	insertStudent(res, req.query.name, req.query.email, req.query.password, req.query.type, req.query.school, req.query.classnum);
	res.send("finished registration");
})

app.get('/', function (req, res) {
	res.send("universally challenged api");
	//testDB(res);
})

app.post('/', function(req, res){
    res.send("got post");
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
