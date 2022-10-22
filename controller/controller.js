// Import bubble tea model
var Bbt = require('../model/model');

// Handle index actions
// GET /bbts route to retrieve all the bbts
exports.index = function (req, res) {
    Bbt.get(function (err, bbts) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: err,
            });
        }
        res.status(200).json({
            message: "Bbts retrieved successfully",
            data: bbts,
        });
    });
};

// Handle create bbt actions
// POST /bbts to save a new entry
exports.new = function (req, res) {
    var bbt = new Bbt();                    // Attributes: drink, shop, rating, comments
    bbt.drink = req.body.drink ? req.body.drink : bbt.drink;
    bbt.shop = req.body.shop;
    bbt.rating = req.body.rating;
    bbt.comments = req.body.comments;

    // Save the bbt and check for errors
    bbt.save(function (err) {
        if (err)
            return res.status(400).send(err);
        res.status(201).json({
            message: 'New bbt created!',
            data: bbt
        });
    });
};

// Handle view bbt info
// GET /bbts/:id route to retrieve a bbt given its id
exports.view = function (req, res) {
    Bbt.findById(req.params.bbt_id, function (err, bbt) {
        if (err)
            return res.status(400).send(err);
        res.status(200).json({
            message: 'Bbt details loading..',
            data: bbt
        });
    });
};

// Handle update bbt info
// PUT /bbts/:id route to retrieve a bbt given its id
exports.update = function (req, res) {
    Bbt.findById(req.params.bbt_id, function (err, bbt) {
        if (err)
            return res.send(err);
        
        bbt.drink = req.body.drink ? req.body.drink : bbt.drink;
        bbt.shop = req.body.shop;
        bbt.rating = req.body.rating;
        bbt.comments = req.body.comments;

        // Save the bbt and check for errors
        bbt.save(function (err) {
            if (err)
                return res.status(400).send(err);
            res.status(200).json({
                message: 'Bbt info updated',
                data: bbt
            });
        });
    });
};

// Handle delete bbt
// DELETE /bbts/:id route to retrieve a bbt given its id
exports.delete = function (req, res) {
    Bbt.deleteOne({
        _id: req.params.bbt_id
    }, function (err, bbt) {
        if (err)
            return res.status(400).send(err);
        res.status(200).json({
            status: "success",
            message: 'Bbt deleted',
        });
    });
};