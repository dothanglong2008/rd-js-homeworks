const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const CredentialSchema = new Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('Credential', CredentialSchema);