// Import Express and user routes, create an instance of Express
const express = require('express'); // Loads the Express framework
const routes = require('./routes/users.js'); // Imports all the routes you defined in users.js
const app = express(); // Creates an Express application instance (app)
const PORT = 5000; // Sets the server to run on port 5000

// Use JSON parsing middleware and user routes
app.use(express.json()); // parses incoming requests with JSON payloads
app.use("/user", routes);

// Start the server and log a message when it's running
app.listen(PORT, () => console.log("Server is running at port " + PORT)); // Listens for incoming HTTP requests on port 5000 and prints is
