var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://pokemon_db:cis510_pokemon@ds111529.mlab.com:11529/teaching', ['courses']);
//var db = mongojs('mongodb://hardikparikh1988:123456798@ds117889.mlab.com:17889/testdbhardik', ['courses']);

// get all courses
router.get('/courses', function (req, res, next) {
    db.courses.find(function (err, courses) {
        if (err) {
            res.send(err);
        }
        res.json(courses);
    });
});

// get single course
router.get('/course/:id', function (req, res, next) {
    db.courses.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, course) {
        if (err) {
            res.send(err);
        }
        res.json(course);
    });
});

// save course
router.post('/course', function (req, res, next) {
    var course = req.body;
     var _course = {
        code: course.code,
        title: course.title,
        description: course.description
    };
    if (!(course.code && course.title)) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    } else {
        db.courses.save(_course, function (err, course) {
            if (err) {
                res.send(err);
            }
            res.json(course);
        });
    }
});

// delete single course
router.delete('/course/:id', function (req, res, next) {
    db.courses.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, course) {
        if (err) {
            res.send(err);
        }
        res.json(course);
    });
});

// update course
router.put('/course', function (req, res, next) {
    var course = req.body;
    var _course = {
        code: course.code,
        title: course.title,
        description: course.description
    };
    if (course && course.title && course.code) {
        db.courses.update({
            _id: mongojs.ObjectId(course._id)
        }, _course, {}, function (err, course) {
            if (err) {
                res.send(err);
            }
            res.json(course);
        });
    } else {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
});

// get all course sessions by course id
router.get('/sessions/:id', function (req, res, next) {
    db.courseSessions.find({
        course_id: mongojs.ObjectId(req.params.id)
    }, function (err, courseSessoins) {
        if (err) {
            res.status = 400;
            res.send(err);
        }
        res.json(courseSessoins);
    });
});

// get single course session 
router.get('/session/:id', function (req, res, next) {
    db.courseSessions.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, courseSession) {
        if (err) {
            res.status = 400;
            res.send(err);
        }
        res.json(courseSession);
    });
});

// save course session
router.post('/session', function (req, res, next) {
    var courseSession = req.body;
    if (!(courseSession.name && courseSession.professor && courseSession.course_id)) {
        res.status(400);
        res.json({
            "error": "No name or professor has been entered"
        });
    } else {
        var _courseSessoin = {
            course_id : mongojs.ObjectId(courseSession.course_id),
            name : courseSession.name,
            professor : courseSession.professor,
            startDate : courseSession.startDate,
            endDate : courseSession.endDate
        };
        db.courseSessions.save(_courseSessoin, function (err, courseSession) {
            if (err) {
                res.send(err);
            }
            res.json(courseSession);
        });
    }
});

// delete single course session
router.delete('/sesson/:id', function (req, res, next) {
    db.courseSessions.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, courseSession) {
        if (err) {
            res.send(err);
        }
        res.json(courseSession);
    });
});

// update course
router.put('/session', function (req, res, next) {
    var courseSession = req.body;
    if (courseSession && courseSession.name && courseSession.professor) {
        var _courseSessoin = {
            course_id : mongojs.ObjectId(courseSession.course_id),
            name : courseSession.name,
            professor : courseSession.professor,
            startDate : courseSession.startDate,
            endDate : courseSession.endDate
        };
        db.courseSessions.update({
            _id: mongojs.ObjectId(courseSession._id)
        }, _courseSessoin, {}, function (err, courseSession) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.json(courseSession);
        });
    } else {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
});

module.exports = router;