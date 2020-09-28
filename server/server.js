// import dependencies and initialize express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// enable parsing of http request body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// access to static files
app.use(express.static(path.join('views')));


// default path to serve up index.html (single page application)
app.all('', (req,res) => {
  res.status(200).sendFile(path.join(__dirname, '../views', 'index.html'));
});

// start node server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Node started on port ' + port);
});
// start server port
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3031

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

 

app.listen(server_port, server_ip_address, function () {

  console.log( "Listening on " + server_ip_address + ", port " + server_port )

});

// error handler for unmatched routes or api calls
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

// error handler for all other uncaught or thrown errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
})
