const mongoose = require('mongoose');

const { Scheme } = mongoose;

const expScheme = new mongoose.Schema({
    reason : String,
    date: String,
    exp: Number
});

module.exports = Expanse = mongoose.model('Expanses', expScheme)