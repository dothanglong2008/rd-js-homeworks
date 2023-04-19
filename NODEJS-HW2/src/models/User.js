const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        _id: String,
        username: String,
        createdDate: Date
    }
)

module.exports = mongoose.model('User', UserSchema);