/**
 * Created by arkulkar on 4/24/2016.
 */
var controller = require('../controller/student.controller');
module.exports = function(app) {
    app.route('/student')
        .post(controller.addStudent);
    app.route('/student/:id')
        .delete(controller.removeStudent)
        .get(controller.studentInfo)
        .put(controller.updateStudent)
};