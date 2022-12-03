const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    location:String,
    language:String,
    availableDay:String,
    password: {
        type: String,
        select: false
    },
   

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = { User };


