const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creates an 'Account' model using Schema
const AccountSchema = new Schema({
    role_id: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = Account = mongoose.model('account', AccountSchema);