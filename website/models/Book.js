const mongoose = require('mongoose');
let Model = module.exports = {};
mongoose.connect('mongodb://localhost:27017/personal_library');
book_schema = mongoose.Schema({
	title: String,
	author_name: String,
	isbn_code: String,
	is_private: Boolean
});
const Book = mongoose.model('Book', book_schema);
Model.save = (book_variable) => {
	book_variable.is_private = book_variable.is_private === undefined
								? false
								: book_variable.is_private;
	let book = new Book( book_variable );
	book.save().then(() => console.log("done"));
};
Model.getAllBooks = async function(){
	let allBooks = await Book.find({});
	return allBooks;
};
Model.getBookById = async function(book_id){
	let book = await Book.findById(book_id);
	return book;
};
Model.getBookByTitle = async function(book_name){
	let books = await Book.find({})
		.where('title').regex(book_name);
	return books;
};
Model.getBooksByAuthor = async function(author_name){
	let books = await Book.find({})
				.where('author_name').regex(author_name);
	return books;
};
Model.getBookByISBNCode = async function(isbn_code){
	let book = await Book.find({}).where('isbn_code').equals(isbn_code);
	return book;
};
Model.updateBook = async function(book){
	try{
		let book_model = await Book.findById(book._id);
		book_model = setValue(book_model, book);
		result = book_model.save();
		console.log("book has been updated")
		return book_model;
	}catch(error){
		console.log(error);
		return false;
	}
}
Model.DeleteBook = async function(book_id){
	try{
		let book_model = await Book.findById(book_id);
		if(book_model === null){
			return [false,"Book does not exist"];
		}
		book_model.delete();
		return true;
	}catch(error){
		console.log(error);
		return [false,error];
	}
}
let setValue = (book_model, book_variables) => {
	book_schema.eachPath((path_name)=>{
		book_model[path_name] = book_variables[path_name];
	});
	return book_model;
}