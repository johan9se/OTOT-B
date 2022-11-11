// Import bubble tea model
var Bbt = require('../model/model');
require('../database/database').connect();
const createClient = require('redis').createClient;

const redisClient = createClient({
    url: process.env.REDIS_URI
})
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().then(() => { console.log('Connected to Redis!') });

// Handle index actions
// GET /bbts route to retrieve all the bbts
exports.index = function (req, res) {
    Bbt.get(async function (err, bbts) {
        try {
            await redisClient.set('all-bbt', JSON.stringify(bbts));
            res.status(200).json({
                message: "Database Bbts retrieved and cached successfully",
                data: bbts,
            });
        } catch (err) {
            res.status(400).json({
                status: "error",
                message: err,
            });
        }
    });
};

// GET /bbtsCache route to retrieve all the bbts in cache
exports.cached = async function (req, res) {
    // Try search cache first
    const cache = await redisClient.get('all-bbt');

    if (cache) {
        const cachedBbts = JSON.parse(cache);
        return res.status(200).json({
            message: "Cached Bbts retrieved successfully",
            data: cachedBbts,
        });
    } else {
        return res.status(200).send("Cache is empty!");
    }
};

// Handle create bbt actions
// POST /bbts to save a new entry
exports.new = function (req, res) {
    var bbt = new Bbt();                    // Attributes: drink, shop, rating, comments
    bbt.drink = req.body.drink ? req.body.drink : bbt.drink;
    bbt.shop = req.body.shop;
    bbt.price = req.body.price;
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
        bbt.price = req.body.price;
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

// Handle delete cached entries
exports.deleteCache = async function (req, res) {
    try {
        redisClient.del('all-bbt');
        return res.status(200).send("Redis cache deleted");
    } catch(err) {
        return res.status(500).send(`Error deleteting cache: ${err}`);
    }
};