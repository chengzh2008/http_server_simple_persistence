'use strict';

var chai = require('chai'),
    chaihttp = require('chai-http'),
    time = require('time'),
    expect = chai.expect;

require('../lib/httpServer');

chai.use(chaihttp);

describe('simple post request', function () {
    var date = new time.Date().toString(),
        post0 = {
            author: "javascript",
            message: "This is the first post text"
        },
        post1 = {
            author: "Java",
            message: "This is the second post text"
        };

    it('responds to a first post request', function (done) {
        chai.request('localhost:3000')
            .post('/posts')
            .send(post0)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.a).to.eql('a');
                done();
            });
    });

    it('should return the first post by get request', function (done) {
        chai.request('localhost:3000')
            .get('/posts/0')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body).to.deep.eql(post0);
                done();
            });

    });


    it('responds to a second post request', function (done) {
        chai.request('localhost:3000')
            .post('/posts')
            .send(post1)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.a).to.eql('a');
                done();
            });
    });

    it('should return the second post by get request', function (done) {
        chai.request('localhost:3000')
            .get('/posts/1')
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body).to.deep.eql(post1);
                done();
            });

    });


});

