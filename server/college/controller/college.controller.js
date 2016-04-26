/**
 * Created by arkulkar on 4/24/2016.
 */
require('../schema/college.schema');
var mongoose = require('mongoose');
var College = mongoose.model('college');

module.exports = {
    addCollege : addCollege,
    removeCollege : removeCollege,
    collegeInfo : collegeInfo,
    updateCollege : updateCollege
};

function addCollege(req, res){
    var stdnt = new College(req.body);
    stdnt.save(saveDb);
    function saveDb(err){
        if (err) {
            return res.status(400).send({
                message: 'unable to add college',
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

function removeCollege(req, res) {
    College.findById(req.params.id).exec(processId);
    function processId(err, college){
        if(err){
            return res.status(400).json({
                message: 'unable to find college with given ID'+req.params.id,
                orMessage : err,
                isError : true
            })
        } else if(college){
            return college.remove(processRemove);
        }
        return res.status(400).json({
            message: 'oops... bad happened',
            isError: true
        });
        function processRemove(err){
            if(err){
                return res.status(400).json({
                    message: 'unable to remove college with given ID'+req.params.id,
                    orMessage : err,
                    isError : true
                })
            } else {
                res.json({
                    message : 'removed successfully',
                    data : college,
                    isError : false
                })
            }
        }
    }
}

function collegeInfo(req, res) {
    College.findById(req.params.id).exec(processId);
    function processId(err, college) {
        if (err) {
            return res.status(400).json({
                message: 'unable to find college with given ID' + req.params.id,
                orMessage : err,
                isError: true
            })
        } else if(college){
            return res.json({
                message : 'college found successfully',
                data : college,
                isError : false
            })
        }
        return res.status(400).json({
            message: 'oops... bad happened',
            isError: true
        })
    }
}

function updateCollege(req, res) {
    var body = req.body;
    College.findById(req.params.id).exec(processId);
    function processId(err, college) {
        if (err) {
            return res.status(400).json({
                message: 'unable to find college with given ID' + req.params.id,
                orMessage : err,
                isError: true
            })
        } else if(college){
            if(body.Name){
                college.Name = body.Name;
            }else if(body.course instanceof Array) {
                college.course = body.course;
            }else if(body.course) {
                college.course.push(body.course);
            }
            return college.save(modifyDb);
            function modifyDb(err){
                if (err) {
                    return res.status(400).send({
                        message: 'unable to modify college data',
                        orMessage : err,
                        isError : true
                    });
                } else {
                    res.status(201).json({
                        message : 'modified successfully !',
                        data : college,
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

