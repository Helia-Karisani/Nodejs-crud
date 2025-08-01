// this is does Implementing Authentication

//Import required modules
const express = require('express'); // Web server framework
const routes = require('./routes/users.js'); //  custom user routes
const jwt = require('jsonwebtoken');
const session = require('express-session'); // For storing user sessions on the server side

//Creates the Express app
//Defines that it will run on port 5000
const app = express();
const PORT = 5000;

// Initialize session middleware with options, enabaling session handling
app.use(session({ secret: "fingerpint", resave: true, saveUninitialized: true }));

// Middleware for authenticating any user request
//Runs before any /user route gets called and the server checks if the user has a valid JWT token saved inside their session
//If there a session with a JWT access token? If yes, verifies the token. If there is not, user is not logged in
app.use("/user", (req, res, next) => {
    // Check if user is authenticated
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken']; // Access Token     
        // Verify JWT token for user authentication
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user; // Set authenticated user data on the request object
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" }); // Return error if token verification fails
            }
        });     
        // Return error if no access token is found in the session
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});

// Parse JSON request bodies
app.use(express.json());

// User routes
app.use("/user", routes);

// Login endpoint
app.post("/login", (req, res) => {
    const user = req.body.user;  //Extracts the user object from the JSON body of the request
    if (!user) { //Checks: If no user was provided, respond with a 404 error saying body is empty
        return res.status(404).json({ message: "Body Empty" });
    }

    // Generates a JWT access token, signed with secret 'access', valid for 1 hour
    let accessToken = jwt.sign({ 
        data: user
    }, 'access', { expiresIn: 60 * 60 });

    // Store access token in session
    // Saves the access token inside the user’s session under a property called authorization
    req.session.authorization = {
        accessToken
    }

    // Sends back success response to the client
    return res.status(200).send("User successfully logged in");
});

// Start server
app.listen(PORT, () => console.log("Server is running at port " + PORT));
