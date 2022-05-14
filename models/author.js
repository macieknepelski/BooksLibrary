const mongoose = require('mongoose');
const Book = require('./book');

const authorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorsSchema.pre('remove', function (next) {
    Book.find({ author: this.id }, (err, books) => {
        if (err) {
            next(err)
        } else if (books.length >0 ) {
            // means there are books for this author, so do not delete the author
            next(new Error ('This author has books still'));
        } else {
            next();
        }
    })
})

module.exports = mongoose.model('Author', authorsSchema)