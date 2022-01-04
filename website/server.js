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
app.post('/book/create', (req, res) => {
	console.log('Creating a book');
	BookController.create(req.body);
	res.send(req.body);
});

app.get('/book/findAll', async function( req, res ){
	let Books = await BookController.findAll();
	console.log(Books);
	res.send(Books);
});
app.get('/book/findByTitle', async function( req, res ){
	console.log(req.query);
	let Books = await BookController.findByTitle(req.query.title);
	res.send(Books);
});

app.listen(port, () => {
	console.log(`app is listening at http://localhost:${port}`);
});

