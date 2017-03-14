var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://pokemon_db:cis510_pokemon@ds111529.mlab.com:11529/teaching', ['users']);
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');
var multer = require('multer');
var fs = require('fs');
var crypto = require("crypto");
var mime = require("mime");


var DIR = './client/uploads/';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        cb(null, req.params.id + "_" + file.originalname)
    }
})

var upload = multer({
    storage: storage
});

router.get('/upload', function (req, res) {
    res.end('file catcher example');
});

router.post('/upload/:id', upload.any(), function (req, res, next) {
    // req.body contains the text fields
    res.end('file uploaded');
});


module.exports = router;