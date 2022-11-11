let fs = require('fs');
let mongoose = require('mongoose');
let Bbt = require('../model/model');

// CONNECT
// Connect to Mongoose and set connection variable
exports.connect = () => {
    const mongoDB = process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : process.env.MONGODB_LOCAL_URI;
    console.log("URI used:" + mongoDB);
    mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
    var db = mongoose.connection;

    // Added check for DB connection
    db.on('connected', function() {
        console.log("MongoDB connected successfully")
    })
    db.on('error', console.error.bind(console, "MongoDB connection error!"))

    // Import mock data to db
    const mockData = JSON.parse(fs.readFileSync('./database/MOCK_DATA.json', 'utf-8'));
    const importMock = async () => {
        console.log("Importing");
        try {
            await Bbt.create(mockData);
            console.log('Mock data imported successfully!');
            console.log(Bbt.count());
        } catch (err) {
            console.log(`Error: ${err}`);
        }       
    }

    Bbt.count((err, count) => {
        console.log(count);
        if (!err && count === 0) {
            importMock();
        }
    })
};