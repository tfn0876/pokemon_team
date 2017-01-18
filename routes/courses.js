var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://pokemon_db:cis510_pokemon@ds111529.mlab.com:11529/teaching', ['courses']);

// get all courses
router.get('/courses', function(req, res, next){
    db.courses.find(function(err, courses){
        if(err){
            res.send(err);
        }
        res.json(courses);
    });
});

// get single course
router.get('/course/:id', function(req, res, next){
    db.courses.findOne({_id : mongojs.ObjectId(req.params.id)}, function(err, course){
        if(err){
            res.send(err);
        }
        res.json(course);
    });
});

// save course
router.post('/course', function(req, res, next){
    var course = req.body;
    if(!(course.code && course.title)) {
        res.status(400);
        res.json({ 
            "error" : "Bad data"
        });
    } else {
        db.courses.save(course,  function(err, course){
            if(err){
                res.send(err);
            }
            res.json(course);
        });
    }
});

// delete single course
router.delete('/course/:id', function(req, res, next){
    db.courses.remove({_id : mongojs.ObjectId(req.params.id)}, function(err, course){
        if(err){
            res.send(err);
        }
        res.json(course);
    });
});

// update course
router.put('/course/:id', function(req, res, next){
    var course = req.body;
    if(course && !course.title && !course.code) {
        db.courses.update({_id: mongojs.ObjectId(req.params.id)},course, {}, function(err, course){
        if(err){
            res.send(err);
        }
        res.json(course);
        });
    } else {
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
});

module.exports = router;

