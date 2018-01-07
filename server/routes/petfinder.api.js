var express = require('express');
var router = express.Router();
var petfinder = require('pet-finder-api')('6deb69a5e86dcc2e49eab74014d62b11','a05ce7abcc11b1896eaa9b5d636df51f');

router.get('/getCatBreeds', function(req, res) {
    petfinder.getBreedList('cat', function(err, breeds) {
        res.json(breeds)
    });
});

router.get('/getDogBreeds', function(req, res) {
    petfinder.getBreedList('dog', function(err, breeds) {
        res.json(breeds)
    });
});

router.get('/getRandomDog', function(req, res) {
    petfinder.getRandomPet({'animal': 'dog'}, function(err, pet) {
        res.json(pet)
    });
});

router.get('/getRandomCat', function(req, res) {
    petfinder.getRandomPet({'animal': 'cat'}, function(err, pet) {
        res.json(pet)
    });
});

router.get('/getPet/:id', function(req, res) {
    petfinder.getPet(req.params.id, [], function(err, pet) {
        res.json(pet)
    });
});

router.get('/getPetsByZip/:zip', function(req, res) {
    petfinder.findPet(req.params.zip, {'count': 100}, function(error, pets) {
        res.json(pets)
    });
});

router.get('/getPetsByZip/:zip/:type', function(req, res) {
    petfinder.findPet(req.params.zip, {'count': 100, 'animal': req.params.type}, function(error, pets) {
        res.json(pets)
    });
});

router.get('/isAvailable/:id', function(req, res) {
    petfinder.getPet(req.params.id, [], function(error, pet) {
        if (pet.hasOwnProperty('status') && pet.status === "X") {
            res.json(false);
        }
        else {
            res.json(pet);
        }
    });
});

module.exports = router;