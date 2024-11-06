const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        id: { type: Number, unique: true, required: true },
        name: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true }
    }
);
module.exports = mongoose.model('User', userSchema);