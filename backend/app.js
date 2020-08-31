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

/*
async function addPage(ID, pageNum, dbo){
	var REEE = Number(ID);
	var newpage;
	var qry = {bookId: REEE};
        dbo.collection('book').find({bookId: REEE}).toArray(function(err,result){
                newpage = result[0].pages[result[0].pages.length-1].pagenum;
		var number2 = Number(newpage);
		number2+=1;
                console.log("new page " + number2);
		var page = {pagenum : number2, active: "true", creators:[]};
             	var vals = {$addToSet:{pages:page}};
                console.log(page);
		dbo.collection('book').updateOne(qry, vals, function(err, result2){
       	        	if (err) throw err;
                        	console.log('past err');
                        });
                });
}*/


async function addPage2(ID,  dbo){
    var REEE = Number(ID);
    var qry = {bookId: REEE};
    
    var book = await dbo.collection('book').findOne(qry);

    var newpage = Number(book.pages[book.pages.length-1].pagenum);
    newpage+=1;
    
    console.log("new page " + newpage);
    var page = {pagenum : newpage, active: "true", creators:[]};
    var vals = {$addToSet:{pages:page}};
    console.log(page);
    await dbo.collection('book').updateOne(qry, vals);
}


/*
function getnum(bookid){
	var num;
	MongoClient.connect(url, function(err, db) {
		var dbo = db.db('books');
		var realid = Number(bookid);
		dbo.collection('book').find({bookId: realid}).toArray(function(err, result){
		//console.log(result[0]);
		
		//console.log("GAP  " + result[0].pages[result[0].pages.length -1].pagenum);
		num = result[0].pages[result[0].pages.length -1].pagenum;
		});
	});
	console.log(num);
	return num;
}


async function naMan(bookid){
	var db, dbo = null;
	try {
	    try {
	        db = await MongoClient.connect(url);
	        dbo = db.db('books');
	    } catch (err) {
	        throw err;
	    }
	
	    var num = -1;
	    if(dbo !== null) {
	        var realid = Number(bookid);
	        dbo.collection('book').find({bookId: realid}).toArray(function(err, result){
	        //console.log(result[0]);
	
	        console.log("GAP  " + result[0].pages[result[0].pages.length -1].pagenum);
	        num = result[0].pages[result[0].pages.length -1].pagenum;
		});
	}
	db.close();
	console.log(num);
	return num;
}catch(err){
	throw err;}
}

app.get('/test2', function(req, res){
	naMan(req.query.bookid);
})
*/

/*app.get('/test', function(req, res){
	console.log("book id in url : " + req.query.bookid);
	getnum(req.query.bookid);
})*/

app.get('/createPage', async function(req, res) {
	db = await MongoClient.connect(url);
	var dbo = await db.db('books');
	addPage2(req.query.id, dbo);
})

app.get('/addPage', function(req, res){
	console.log(req.query.id + "     " +  req.query.pageNum);
	addPage(req.query.id, req.query.pageNum);
})

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
})

app.post('/', function(req, res){
    res.send("got post");
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
