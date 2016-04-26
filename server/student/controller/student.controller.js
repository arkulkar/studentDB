/**
 * Created by arkulkar on 4/24/2016.
 */
require('../schema/student.schema');
require('../../college/schema/college.schema');
var mongoose = require('mongoose');
var Student = mongoose.model('student');
var College = mongoose.model('college');

module.exports = {
    addStudent : addStudent,
    removeStudent : removeStudent,
    studentInfo : studentInfo,
    updateStudent : updateStudent
};

function addStudent(req, res){
    var college = new College();
    var clg = college.statics.findPersonByName(req.body.college,findCollegeId);
    function findCollegeId(err, col) {
        if (err) {
            return res.status(400).json({
                message: 'unable to find the college' + req.params.college,
                orMessage: err,
                isError: true
            });
        }else if(col){
            console.log(col);
            return col;
        }
    }
    var stdnt = new Student(req.body);
    console.log(req.body);
    stdnt.save(saveDb);
    function saveDb(err){
        if (err) {
            return res.status(400).send({
                message: 'unable to add db',
                orMessage : err,
                isError : true
            });
        } else {
            res.status(201).json({
                message : 'added successfully !',
                data : stdnt,
                isError : false
            });
        }
    }
}

function removeStudent(req, res) {
    Student.findById(req.params.id).exec(processId);
    function processId(err, student){
        if(err){
            return res.status(400).json({
                message: 'unable to find student with given ID'+req.params.id,
                orMessage : err,
                isError : true
            })
        } else if(student){
            return student.remove(processRemove);
        }
        return res.status(400).json({
            message: 'oops... bad happened',
            isError: true
        });
        function processRemove(err){
            if(err){
                return res.status(400).json({
                    message: 'unable to remove student with given ID'+req.params.id,
                    orMessage : err,
                    isError : true
                })
            } else {
                res.json({
                    message : 'removed successfully',
                    data : student,
                    isError : false
                })
            }
        }
    }
}

function studentInfo(req, res) {
    Student.findById(req.params.id).exec(processId);
    function processId(err, student) {
        if (err) {
            return res.status(400).json({
                message: 'unable to find student with given ID' + req.params.id,
                orMessage : err,
                isError: true
            })
        } else if(student){
            return res.json({
                message : 'student found successfully',
                data : student,
                isError : false
            })
        }
        return res.status(400).json({
            message: 'oops... bad happened',
            isError: true
        })
    }
}

function updateStudent(req, res) {
    var body = req.body;
    Student.findById(req.params.id).exec(processId);
    function processId(err, student) {
        if (err) {
            return res.status(400).json({
                message: 'unable to find student with given ID' + req.params.id,
                orMessage : err,
                isError: true
            })
        } else if(student){
            if(body.fstName){
                student.fstName = body.fstName;
            }else if(body.lstName){
                student.lstName = body.lstName;
            }else if(body.college){
                student.college = body.college;
            }else if(body.course) {
                student.course = body.course;
            }
            return student.save(modifyDb);
            function modifyDb(err){
                if (err) {
                    return res.status(400).send({
                        message: 'unable to modify student data',
                        isError : true
                    });
                } else {
                    res.status(201).json({
                        message : 'modified successfully !',
                        data : student,
                        isError : false
                    });
                }
            }
        }
        return res.status(400).json({
            message: 'oops... bad happened',
            isError: true
        })
    }
}

