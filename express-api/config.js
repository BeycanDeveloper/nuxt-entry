const mongoose = require('mongoose');

const db =mongoose.connect('mongodb://localhost:27017/code-challenge');

module.exports = {
    db
}
