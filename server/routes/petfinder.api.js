var express = require('express');
var router = express.Router();
var petfinder = require('pet-finder-api')('6deb69a5e86dcc2e49eab74014d62b11','a05ce7abcc11b1896eaa9b5d636df51f');

router.get('/getBreeds', function(req, res) {
    petfinder.getBreedList('cat', function(err, breeds) {
        res.json(breeds)
    });
})

module.exports = router;
