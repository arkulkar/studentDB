/**
 * Created by arkulkar on 4/24/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema ({

   joinDate : {
       type : Date,
       default : Date.now
   },
    fstName : {
        type : String,
        required : true,
        trim : true
    },
    lstName : {
        type : String,
        required : true,
        trim : true
    },
    college : {
        type : Schema.Types.ObjectId,
        ref : 'college',
        trim : true
    },
    course : {
        type : String,
        enum : ['CSE','ECE','IT'],
        required : true
    },
    contact : {
        type : Number
    },
    age : {
        type : Number,
        required : true,
        max : 24,
        min : 18
    },
    email : {
        type : String,
        validate : {
            validator : function validateEmail(email){
                return /^[a-zA-Z]+@[a-zA-Z]+\.com$/.test(email);
            },
            message : 'invalid email'
        }
    }
});

studentSchema.path('contact').validate(function valid(contactNum){
    return /^[0-9]{10}$/.test(contactNum);
}, 'contact number not valid');

mongoose.model('student', studentSchema);
