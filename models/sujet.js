const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
//create schema
const SujetSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text:{
        type: String
    },
    date:{
        type: String,
    },
    author:{
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    totalcomments:{
        type: Number
    },  
    comments: [{type :new Schema({
        date:{
            type: String,
            required:true
        },
        upvotes:{
            type: Array
        },
        downvotes:{
            type: Array
        },
        user:{
            type: String
        },
        content:{
            type: String
        }
    })
    }]
});

module.exports= Sujet = mongoose.model('sujets', SujetSchema);