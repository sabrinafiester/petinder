var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username
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
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

router.post('/ideal', function (req, res) {
    console.log('ideal post before auth')
    if (req.isAuthenticated()) {
        console.log('req.body', req.body);

        // send back user object from database
        console.log('logged in', req.user);
        console.log('/ideal post hit');
        var userInfo = {
            username: req.user.username,
            id: req.user.id
        };

        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                // when connecting to database failed
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                // when connecting to database worked!
                client.query('INSERT INTO ideal_pet (user_id, size, age, sex, kids, dogs, cats, animal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);', [req.user.id, req.body.size, req.body.age, req.body.sex, req.body.kids, req.body.dogs, req.body.cats, req.body.animal], function (errorMakingQuery, result) {
                    done()
                    if (errorMakingQuery) {
                        console.log('Error making database query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        console.log(result.rows);
                        res.send(result.rows);
                    }
                });
            }
        });
    } else {
        console.log('not logged in');
        res.sendStatus(403)
    }
});

router.get('/ideal', function (req, res) {
    console.log('made it to user/ideal get!')
    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in', req.user);
        console.log('/user/ideal get hit');
        var userInfo = {
            username: req.user.username,
            id: req.user.id
        };
        console.log('id is', userInfo.id)
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                // when connecting to database failed
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                // when connecting to database worked!
                client.query('SELECT * FROM ideal_pet WHERE user_id = $1 ORDER BY id DESC LIMIT 1;', [req.user.id], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making database query', errorMakingQuery);
                        console.log(req.user.id);
                        res.sendStatus(500);
                    } else {
                        console.log(result.rows);
                        res.send(result.rows);
                    }
                });
            }
        });
    } else {
        console.log('not logged in');
        res.sendStatus(403)
    }
});

module.exports = router;
