// IMPORT
let express = require('express');
let bodyParser = require('body-parser');
let apiRoutes = require("./api-routes");
let cors = require('cors');
// ==============

// SERVER
let app = express();
// Setup server port
var port = process.env.PORT || 8000;

// MIDDLEWARE
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({            
    extended: true
}));
app.use(bodyParser.json());

// Configure cors so that frontend can use
app.use(cors()) 

// ROUTERS
// Use API routes in the app
app.use('/api', apiRoutes);

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express and Nodemon'));

// Launch app to listen to specified port
var server = app.listen(port, function () {
    console.log("Running bbtdiary on port " + port);
});

module.exports = server;