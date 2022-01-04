const express = require('express');
const app = express();
const port = 3000;
const HomeController = require('./controllers/HomeController.js');
const BookController = require('./controllers/BookController.js');
//
console.clear();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res) => {
	res.send(HomeController.Home());
});

// book related routes

// create books
{
	app.post('/book/create', (req, res) => {
		console.log('Creating a book');
		BookController.create(req.body);
		res.send(req.body);
	});
}

// find books
{ 
	app.get('/book/findAll', async function( req, res ){
		let Books = await BookController.findAll();
		console.log(Books);
		res.send(Books);
	});
	app.get('/book/findByTitle', async function( req, res ){
		let title = req.query.title === undefined
						? req.body.title
						: req.query.title;
		let Books = await BookController.findByTitle(title);
		res.send(Books);
	});
	app.get('/book/findByID', async function(req, res){
		let book_id = req.query.id === undefined
						? req.body.id
						: req.query.id;
		let Book = await BookController.findById(book_id);
		res.send(Book);
	});
	app.get('/book/findByAuthor', async function(req, res){
		let author_name = "";
		if(req.query.author === undefined && req.query.author_name === undefined){
			author_name = req.body.author === undefined
								? req.body.author_name
								: req.body.author;
		}else{
			author_name = req.query.author === undefined
								? req.query.author_name
								: req.query.author;
		}
		let Books = await BookController.findByAuthor(author_name);
		res.send(Books);
	});
	app.get('/book/findByISBNCode', async function(req, res){
		let isbn_code = req.query.isbn_code === undefined
							? req.body.isbn_code
							: req.query.isbn_code;
		let Book = await BookController.findByISBNCode(isbn_code);
		res.send(Book);
	});
}

// Delete Books
{
	app.delete('/book/delete', async function(req, res){
		let id = req.body.id === undefined
					? req.body._id
					: req.body.id;
		let result = await BookController.DeleteBook(id);
		res.send(result);
	});
}

// Edit Books
{
	app.post('/book/update', async function(req, res){
		let result = await BookController.UpdateBook(req.body);
		res.send(result);
	});
}

// Create Chapters
{}

// Find Chapters
{}

// Delete Chapters
{}

// to start the server
app.listen(port, () => {
	console.log(`app is listening at http://localhost:${port}`);
});

