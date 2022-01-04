const mongoose = require('mongoose');
let Model = module.exports = {};
mongoose.connect('mongodb://localhost:27017/personal_library');
book_schema = mongoose.Schema({
	title: String,
	author_name: String,
	isbn_code: String
});
const Book = mongoose.model('Book', book_schema);
Model.save = (book_variable) => {
	let book = new Book( book_variable );
	book.save().then(() => console.log("done"));
};
Model.getAllBooks = async function(){
	let allBooks = await Book.find({});
	return allBooks;
};
Model.getBookById = async function(book_id){
	let book = await Book.findById(book_id).exec(callback);
	return book;
};
Model.getBookByTitle = async function(book_name){
	let books = await Book.find({})
		.where('title').regex(book_name);
	return books;
};
Model.getBookByAuthor = async function(){};
Model.getBookByISBNCode = async function(){};
