// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to Bbt Diary crafted with love! <3'
    });
});

// Import bbt controller
var bbtController = require('./controller/controller');

// Bbt routes
router.route('/bbts')
    .get(bbtController.index)
    .post(bbtController.new);

router.route('/bbts/:bbt_id')
    .get(bbtController.view)
    .patch(bbtController.update)
    .put(bbtController.update)
    .delete(bbtController.delete);

router.get('/bbts_cache', bbtController.cached);
router.get('/delete_cache', bbtController.deleteCache);

// Export API routes
module.exports = router;