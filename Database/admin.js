const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


const Admin = mongoose.model('Admin', AdminSchema);

module.exports = { Admin };