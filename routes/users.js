// this file contains actual logic:	Handles GET, POST, PUT, DELETE for users

const express = require('express'); // loads express
const router = express.Router(); // creates router objects so I can attach routes to it 

// Acts like a temporary database.
// This array stores user details in-memory
// (will reset every time the server restarts)
let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email; //extract email parameter from the requested url
  // filter the users array to find the users with matching email
  let filtered_users = users.filter((user) => user.email === email);
  res.send(filtered_users);
});


// POST request: Create a new user, C from CRUD
router.post("/",(req,res)=>{
  // push a new user
  users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB    
  });
  // send a success message
  res.send("The user " + req.query.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

module.exports=router; // Makes this router available to be imported in index.js with
