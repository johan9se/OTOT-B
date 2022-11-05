var mongoose = require('mongoose');

// Setup schema
var bbtSchema = mongoose.Schema({
    drink: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true
    },
    price: Number,
    rating: Number,
    comments: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Bbt model
var Bbt = module.exports = mongoose.model('Bbt', bbtSchema);

module.exports.get = function (callback, limit) {
    Bbt.find(callback).limit(limit);
}