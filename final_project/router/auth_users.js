const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
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

const authenticatedUser = (username, password) => {
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}


//only registered users can login
regd_users.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = req.body.user;
    if (!username || !password) {
        return res.status(404).json({ message: "Username or password not given" });
    }

    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: user
        }, 'access', { expiresIn: 60 * 60 });
        // Store access token in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in. \n Token: " + accessToken);
    } else {
        return res.status(200).send("Incorrect username or password");
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    // Review object contains 

    const review = req.body.review;
    const isbn = req.body.isbn;
    const username = req.session.authorization['username'];

    if (isValid(username) && isbn && review) {
        for (i in books[isbn].reviews) {

        }

        return res.status(300).json({ message: "Valid Review" });

    } else {
        return res.status(300).json({ message: "Invalid Username/ISBN or missing review text" });
    }

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
