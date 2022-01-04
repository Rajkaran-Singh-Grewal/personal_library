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
controller.findById = async function(book_id){
	let book = await Book.getBookById(book_id);
	return book;
}
controller.findByAuthor = async function(author_name){
	let Books = await Book.getBooksByAuthor(author_name);
	return Books;
}
controller.findByISBNCode = async function(isbn_code){
	let book = await Book.getBookByISBNCode(isbn_code);
	return book;
}
controller.UpdateBook = async function(book){
	let result = await Book.updateBook(book);
	return result;
}
controller.DeleteBook = async function(book_id){
	let result = await Book.DeleteBook(book_id);
	return result;
}