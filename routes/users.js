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
  //res.send(users);
  res.send(JSON.stringify({users}, null, 4));
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
    // Extract email parameter and find users with matching email
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    
    if (filtered_users.length > 0) {
        // Select the first matching user and update attributes if provided
        let filtered_user = filtered_users[0];
        
        // Extract and update DOB of the query
        let DOB = req.query.DOB;    
        if (DOB) {
            filtered_user.DOB = DOB; // for now, we have a copied object that has an updated DOB
        }

        // extrac the firs name from the query then update the object in the list
        let first_name = req.query.firstName;
        if(first_name){
          filtered_user.firstName = first_name;
        }

        // Replace old user entry with updated user       
        users = users.filter((user) => user.email != email); // it keeps only those users whose email is NOT equal to the given email
        users.push(filtered_user);
        
        // Send success message indicating the user has been updated
        res.send(`User with the email ${email} updated.`);
    } else {
        // Send error message if no user found
        res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    // Extract the email parameter from the request URL
    const email = req.params.email;
    // Filter the users array to exclude the user with the specified email
    users = users.filter((user) => user.email != email);
    // Send a success message as the response, indicating the user has been deleted
    res.send(`User with the email ${email} deleted.`);
});

module.exports=router; // Makes this router available to be imported in index.js with
