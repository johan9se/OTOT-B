// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');

var Bbt = require('../model/model');
var app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();          // To use the should() interface/assertion style

describe("BBTS", () => {
    beforeEach((done) => {
        Bbt.deleteMany({}, (err) => { 
           done();           
        });        
    });

    // Test the GET route
    describe("GET /api/bbts", () => {
        // Test to get all records
        it ("Should get 0 bbt records (empty db)", (done) => {
            chai.request(app)
                .get('/api/bbts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe("POST /api/bbts", () => {
        // Test the POST route
        it("should not POST a bbt without shop field", (done) => {
            let bad_sample_bbt = {
                drink: "milk tea",
                rating: 3,
                comments: "standard",
            }
            chai.request(app)
                .post('/api/bbts')
                .send(bad_sample_bbt)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('shop');
                    res.body.errors.shop.should.have.property('kind').eql('required');
                    done();
                });
            });
        it("should POST a bbt", (done) => {
            let good_sample_bbt = {
                drink: "green milk tea",
                shop: "LiHo",
                rating: 4,
                comments: "yummy",
            }
            chai.request(app)
                .post('/api/bbts')
                .send(good_sample_bbt)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('New bbt created!');
                    res.body.data.should.have.property('drink');
                    res.body.data.should.have.property('shop');
                    res.body.data.should.have.property('rating');
                    res.body.data.should.have.property('comments');
                    done();
                });
        });
    });

    // Test the GET/:id route
    describe("GET /api/bbts/:id", () => {
        // Test to get one bbt record
        it ("Should get 1 bbt record", (done) => {
            let bbt = new Bbt({
                drink: "honey milk tea",
                shop: "Koi",
                rating: 5,
                comments: "sweet & refreshing",
            });
            bbt.save((err, bbt) => {
                chai.request(app)
                    .get('/api/bbts/' + bbt.id)
                    .send(bbt)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.data.should.have.property('drink');
                        res.body.data.should.have.property('shop');
                        res.body.data.should.have.property('rating');
                        res.body.data.should.have.property('comments');
                        done();
                    });
            });
        });
    });

    // Test the PUT/:id route
    describe("PUT /api/bbts/:id", () => {
        // Test to update one bbt record
        it ("Should update 1 bbt record", (done) => {
            let bbt = new Bbt({
                drink: "taro coconut shake",
                shop: "idk",
                rating: 3,
                comments: "light taro taste",
            });
            bbt.save((err, bbt) => {
                chai.request(app)
                    .put('/api/bbts/' + bbt.id)
                    .send({
                        drink: "taro coconut shake",
                        shop: "super coconut",
                        rating: 3,
                        comments: "light taro taste",
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Bbt info updated');
                        res.body.data.should.have.property('shop').eql('super coconut');
                        done();
                    });
            });
        });
    });

    // Test the DELETE/:id route
    describe("DELETE /api/bbts/:id", () => {
        // Test to delete one bbt record
        it ("Should delete 1 bbt record", (done) => {
            let bbt = new Bbt({
                drink: "peach honey tea",
                shop: "sweettea",
                rating: 2,
                comments: "too sweet",
            });
            bbt.save((err, bbt) => {
                chai.request(app)
                    .delete('/api/bbts/' + bbt.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Bbt deleted');
                        done();
                    });
            });
        });
    });
});