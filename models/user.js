const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    connected: {
        type: Boolean,
    }
})
UserSchema.methods.isConnected = function() {
    b= false;
    return b;
}

module.exports= User = mongoose.model('users', UserSchema);