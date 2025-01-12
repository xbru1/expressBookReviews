const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    // Send all books
  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
// NOTE: I am having to assume that the index of the object is the 'ISBN' even though a real ISBN would have 10 or 13 digits
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    // console.log("ISBN: " + isbn);
    return res.send(JSON.stringify(books[isbn], null, 4));
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    console.log(books);
    const author = req.params.author;
    let filteredBooks = {};

    for (var id in books) {
        // Using .toLowerCase() so that this isn't case sensitive
        // The regex replaces all spaces with underscores to make using the API much easier
        if (books[id].author.toLowerCase().replace(/\s+/g, '_') === author.toLowerCase()) {
            filteredBooks[id] = books[id];
        }
    }
    return res.send(JSON.stringify(filteredBooks, null, 4));
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    // Same thing as the previous
    console.log(books);
    const title = req.params.title;
    let filteredBooks = {};

    for (var id in books) {
        if (books[id].title.toLowerCase().replace(/\s+/g, '_') === title.toLowerCase()) {
            filteredBooks[id] = books[id];
        }
    }
    return res.send(JSON.stringify(filteredBooks, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
