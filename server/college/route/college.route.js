/**
 * Created by arkulkar on 4/24/2016.
 */
var controller = require('../controller/college.controller');
module.exports = function(app) {
    app.route('/college')
        .post(controller.addCollege);
    app.route('/college/:id')
        .delete(controller.removeCollege)
        .get(controller.collegeInfo)
        .put(controller.updateCollege);
};