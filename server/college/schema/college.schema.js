/**
 * Created by arkulkar on 4/24/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collegeSchema = new Schema ({

    Name: {
        type: String,
        required: true,
        unique : true,
        trim: true
    },
    course: {
        type: Array,
        required: true
    },
    contact: {
        type: Number
    },
    email: {
        type: String,
        required: true
    }
});

collegeSchema.path('email').validate(function validateEmail(email){
    return /^[a-zA-Z]+@[a-zA-Z]+\.com$/.test(email);
}, 'invalid email');

collegeSchema.path('contact').validate(function valid(contactNum){
    return /^[0-9]{10}$/.test(contactNum);
}, 'contact number not valid');

mongoose.model('college', collegeSchema);
