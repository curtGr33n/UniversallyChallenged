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
					classId:classnum
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

function addBook(bookTitle, bookCoverLink, school, classId){
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
                        classId:classId,
                        pages:[]
                });	
		});
	});
	db.close();
}

async function addPage2(ID,  dbo){
    var REEE = Number(ID);
    var qry = {bookId: REEE};
    var book = await dbo.collection('book').findOne(qry);
    var newpage = Number(book.pages[book.pages.length-1].pagenum);
    newpage+=1;
    if(newpage == null){
    	newpage = 1;
    }
    console.log("new page " + newpage);
    var page = {pagenum : newpage, active: "true", creators:[]};
    var vals = {$addToSet:{pages:page}};
    console.log(page);
    await dbo.collection('book').updateOne(qry, vals);
}

async function addCreator(bookID, pageID, dbo, sID, role,){
	var numID = Number(bookID);
	var numPage = Number(pageID);
	var numSID = Number(sID);
	var creatrs = {studentId:numSID, role:role, canvas:"", final:""};
	var imMad = await dbo.collection('book').findOne({bookId:numID});
	for(i = 0; i < imMad.pages.length; i++){
		if(imMad.pages[i].pagenum  == numPage){
			imMad.pages[i].creators = creatrs;
		}
	}
	dbo.collection('book').replaceOne({bookId:numID}, imMad);
}

async function getBook(dbo, bookId){
	var intBookId = Number(bookId);
	dbo.collection('book').find({bookId: intBookId}).toArray(function(err,result){
		console.log(result[0]);
		return result[0];
	})
}

async function getPage(dbo, bookId, pageId){
	var intBookId = Number(bookId);
	var intPageId = Number(pageId);
	var book = await dbo.collection('book').findOne({bookId:intBookId});
	for(i = 0; i < book.pages.length; i++){
		if(book.pages[i].pagenum == intPageId){
			console.log(book.pages[i]);
			return book.pages[i];
		}
	}
}

async function getCreator(dbo, bookId, pageId){
	var intBookId = Number(bookId);
	var intPageId = Number(pageId);
	var book = await dbo.collection('book').findOne({bookId:intBookId});
	for(i = 0; i < book.pages.length; i++){
			if(book.pages[i].pagenum == intPageId){
					console.log(book.pages[i].creators);
					return book.pages[i].creators;
			}
	}
}

async function getPages(dbo, bookId){
    var intBookId = Number(bookId);
    var book = await dbo.collection('book').findOne({bookId:intBookId});
	console.log(book.pages);
	return book.pages;	
}

async function getClassBooks(dbo, classId){
	var intClassId = Number(classId);
	dbo.collection('book').find({classId: intClassId}).toArray(function(err,result){
		console.log(result);
		return result;
	})
}

async function getSchoolBooks(dbo, school){
	dbo.collection('book').find({school: school}).toArray(function(err,result){
		console.log(result);
		return result;
	})
}

/*
async function getStudentBooks(dbo, sID){
	var numSID = Number(sID);
	var studentReturn
	var imMad = await dbo.collection('book').find({}).toArray(function(err,result){
		for(i = 0; i < imMad.length; i++){
			for(j = 0; j < imMad[i].pages.length; j++){
				
				if(imMad[i].pages[j].creators == numSID){
					studentReturn += imMad[i].pages[j].creators;
				}
			}
		}
		return studentReturn;
	})
}
*/

app.get('/getSchoolBooks', async function(req, res){
	db = await MongoClient.connect(url);
    var dbo = await db.db('books');
    getSchoolBooks(dbo, req.query.school);
})

app.get('/getClassBooks', async function(req, res){
	db = await MongoClient.connect(url);
    var dbo = await db.db('books');
    getClassBooks(dbo, req.query.classId);
})

app.get('/getPages', async function(req, res){
	db = await MongoClient.connect(url);
    var dbo = await db.db('books');
    getPages(dbo, req.query.bookId);
})

app.get('/getCreator', async function(req, res){
        db = await MongoClient.connect(url);
        var dbo = await db.db('books');
        getCreator(dbo, req.query.bookId, req.query.pageId);
})

app.get('/getPage', async function(req, res){
        db = await MongoClient.connect(url);
        var dbo = await db.db('books');
        getPage(dbo, req.query.bookId, req.query.pageId);
})

app.get('/getBook', async function(req, res){
	db = await MongoClient.connect(url);
	var dbo = await db.db('books');
	getBook(dbo, req.query.bookId);
})

app.get('/addDetails', async function(req, res){
	db = await MongoClient.connect(url);
	var dbo = await db.db('books');
	addCreator(req.query.bookID, req.query.pageID, dbo, req.query.sID, req.query.role);
	console.log('addDetails');
})

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
