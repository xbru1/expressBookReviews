const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const alreadyExists = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!alreadyExists(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {

    // Create the promise
    const promise = new Promise((resolve, reject) => {

        // Timeout if it can't get the data within 5 seconds
        setTimeout(() => { reject("Unable to get list of books") }, 5000);

        // Stringify and check if the resulting string is valid
        let text = JSON.stringify(books, null, 4);
        if (text) {
            resolve(text);
        } else {
            reject("Failed to fetch book data");
        }
    });

    // Send the data if it valid, send an error if it isn't
    promise
        .then((text) => {
            console.log("Fetched book data");
            return res.send(text);
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).json({ message: "Failed to get book data" });
        });
});

// Get book details based on ISBN
// NOTE: I am having to assume that the index of the object is the 'ISBN' even though a real ISBN would most likely have 10 or 13 digits
public_users.get('/isbn/:isbn', function (req, res) {

    // Create the promise
    const promise = new Promise((resolve, reject) => {

        // Timeout if it can't get the data within 5 seconds
        setTimeout(() => { reject("Unable to get list of books") }, 5000);

        // Get the ISBN
        const isbn = req.params.isbn;

        // Stringify and check if the resulting string is valid
        let text = JSON.stringify(books[isbn], null, 4);
        if (text) {
            resolve(text);
        } else {
            reject("Failed to fetch book data from ISBN");
        }
    });

    // Send the data if it valid, send an error if it isn't
    promise
        .then((text) => {
            console.log("Fetched book data from ISBN");
            return res.send(text);
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).json({ message: "Failed to get book data from ISBN" });
        });

});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {

    // Create the promise
    const promise = new Promise((resolve, reject) => {

        // Timeout if it can't get the data within 5 seconds
        setTimeout(() => { reject("Unable to get list of books") }, 5000);

        // Get the author
        const author = req.params.author;
        let filteredBooks = {};

        // Filter the books array
        for (var id in books) {
            // Using .toLowerCase() so that this isn't case sensitive
            // The regex replaces all spaces with underscores to make using the API much easier
            if (books[id].author.toLowerCase().replace(/\s+/g, '_') === author.toLowerCase()) {
                filteredBooks[id] = books[id];
            }
        }

        // Stringify and check if the resulting string is valid
        let text = JSON.stringify(filteredBooks, null, 4);
        if (text) {
            resolve(text);
        } else {
            reject("Failed to fetch book data from author");
        }
    });

    // Send the data if it valid, send an error if it isn't
    promise
        .then((text) => {
            console.log("Fetched book data from author");
            return res.send(text);
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).json({ message: "Failed to get book data from author" });
        });
    
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {

    // Create the promise
    const promise = new Promise((resolve, reject) => {

        // Timeout if it can't get the data within 5 seconds
        setTimeout(() => { reject("Unable to get list of books") }, 5000);

        // Get the title
        const title = req.params.title;
        let filteredBooks = {};

        // Filter the books array
        for (var id in books) {
            // Using .toLowerCase() so that this isn't case sensitive
            // The regex replaces all spaces with underscores to make using the API much easier
            if (books[id].title.toLowerCase().replace(/\s+/g, '_') === title.toLowerCase()) {
                filteredBooks[id] = books[id];
            }
        }

        // Stringify and check if the resulting string is valid
        let text = JSON.stringify(filteredBooks, null, 4);
        if (text) {
            resolve(text);
        } else {
            reject("Failed to fetch book data from title");
        }
    });

    // Send the data if it valid, send an error if it isn't
    promise
        .then((text) => {
            console.log("Fetched book data from title");
            return res.send(text);
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).json({ message: "Failed to get book data from title" });
        });

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    // console.log("ISBN: " + isbn);
    return res.send(JSON.stringify(books[isbn].reviews, null, 4));
});

module.exports.general = public_users;
