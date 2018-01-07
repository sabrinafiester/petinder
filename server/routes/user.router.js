var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
  console.log('get /user route');
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username: req.user.username,
      species: req.user.prefs_species
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function (req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

router.put('/prefs', function (req, res) {
  console.log('prefs put route hit')
  console.log('species prefs are', req.body)
  if (req.isAuthenticated()) {
    console.log('logged in', req.user);
    var userInfo = {
      username: req.user.username
    };
    pool.connect(function (errorConnectingToDatabase, client, done) {
      if (errorConnectingToDatabase) {
        // when connecting to database failed
        console.log('Error connecting to database', errorConnectingToDatabase);
        res.sendStatus(500);
      } else {
        // when connecting to database worked!
        //client.query('UPDATE users SET name= $3, message=$1 WHERE ID=$2;', [req.body.message, messageID, req.body.username], function (errorMakingQuery, result) {
        client.query('UPDATE users SET prefs_species= $1 WHERE id=$2;', [req.body.species, req.user.id], function (errorMakingQuery, result) {
          done();
          if (errorMakingQuery) {
            console.log('Error making database query', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          };
        });
      };
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
})


module.exports = router;



router.put('/:id', function (req, res) {
  var messageID = req.params.id;
  console.log('message put was hit!');
  // Add an INSERT query

});