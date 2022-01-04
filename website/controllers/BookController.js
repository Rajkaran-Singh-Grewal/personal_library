let controller = module.exports = {};
let Book = require('../models/Book.js');
controller.create = (book_variables) => {
	console.log(book_variables);
	Book.save(book_variables);
	return "book has been created";
}
controller.findAll = async function(){
	let Books = await Book.getAllBooks();
	return Books;
}
controller.findByTitle = async function(title){
	let Books = await Book.getBookByTitle(title);
	return Books;
}
