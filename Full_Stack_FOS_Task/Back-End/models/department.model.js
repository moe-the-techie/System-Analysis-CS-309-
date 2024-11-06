const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
    {
        id: {type: Number, unique: true, required: true},
        name: {type: String, required: true},
        description: {type: String, required: true},
        link: {type: String, required: true},
    }
);
module.exports = mongoose.model('Department', departmentSchema);