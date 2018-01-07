var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');

// Handles request for HTML file
router.get('/', function(req, res, next) {
  console.log('get /register route');
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
// Handles POST request with new user data
router.post('/', function(req, res, next) {
    console.log('post new user');

  var saveUser = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      zipcode: req.body.zipCode,
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password)

  };
  console.log('new user:', saveUser);

  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting: ", err);
      res.sendStatus(500);
    }
    client.query("INSERT INTO users (username, password, firstname, lastname, email, zipcode) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [saveUser.username, saveUser.password, saveUser.firstname, saveUser.lastname, saveUser.email, saveUser.zipcode],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
  });

});


module.exports = router;
