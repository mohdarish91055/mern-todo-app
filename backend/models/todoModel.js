const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    title: { 
        type: String, 
        required: true, 
      },
    completed:{
        type:Boolean,
        default:false,
    },
});

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;