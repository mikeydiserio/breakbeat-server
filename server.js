// load up the express framework and body-parser helper
const express = require('express');

const allowlist = ['http://localhost:/3000', 'https://csv-admin-front-end.herokuapp.com/', 'http://localhost:/5000', 'http://localhost:/3001'];

const corsOptionsDelegate = function (req, callback) {
	let corsOptions;
	if (allowlist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

// set the port to be herokus for prod or 5000 for dev
const port = process.env.PORT || 5000;

// create an instance of express to serve our end points
const app = express();

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require('fs');

// including handling JSON data
// app.use(cors());
app.use((req, res, next) => { //doesn't send response just adjusts it
    res.header("Access-Control-Allow-Origin", "*") //* to give access to any origin
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
        return res.status(200).json({});
    }
    next(); //so that other routes can take over
})

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// this is where we'll handle our various routes from
const routes = require('./routes/routes.js')(app, fs, corsOptionsDelegate);

// finally, launch our server on port 3001.
const server = app.listen(port, () => {
	console.log('listening on port %s...', server.address().port);
});

