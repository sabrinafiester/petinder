var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in', req.user);
        console.log('/pets get hit');
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
                client.query('SELECT * FROM petlist WHERE user_id=$1', [userInfo.id], function (errorMakingQuery, result) {
                    done();
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

router.post('/', function (req, res) {
    if (req.isAuthenticated()) {
        //petId = req.body.petId;
        // send back user object from database
        console.log('logged in', req.user);
        console.log('/pets post hit');
        console.log('pet to save is ', req.body)
        var userInfo = {
            username: req.user.username,
            id: req.user.id
        };

        var petToSave = {

        }
        console.log('id is', userInfo.id)
        // pool.connect(function (errorConnectingToDatabase, client, done) {
        //     if (errorConnectingToDatabase) {
        //         // when connecting to database failed
        //         console.log('Error connecting to database', errorConnectingToDatabase);
        //         res.sendStatus(500);
        //     } else {
        //         // when connecting to database worked!
        //         client.query('INSERT INTO petlist (user_id, petfinder_id) VALUES $1, $2;', [userInfo.id, petId], function (errorMakingQuery, result) {
        //             done();
        //             if (errorMakingQuery) {
        //                 console.log('Error making database query', errorMakingQuery);
        //                 res.sendStatus(500);
        //             } else {
        //                 console.log(result.rows);
        //                 res.send(result.rows);
        //             }
        //         });
        //     }
        // });
    } else {
        console.log('not logged in');
        res.sendStatus(403)
    }
});

module.exports = router;
