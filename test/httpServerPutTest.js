'use strict';

var chai = require('chai'),
    chaihttp = require('chai-http'),
    time = require('time'),
    expect = chai.expect,
    chance = new require('chance')();

require('../lib/httpServer');

chai.use(chaihttp);

function getRandomJsonObject() {
    return {
        author: chance.string(10),
        message: chance.string(100)
    }
}

describe('test put request', function () {
    var date = new time.Date().toString(),
        a = getRandomJsonObject(),
        b = getRandomJsonObject(),
        e = getRandomJsonObject(),
        f = getRandomJsonObject();

    // test post request method
    it('should responds to a post request', function (done) {
        chai.request('localhost:3000')
            .post('/posts')
            .send(a)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Successfully saved the post content');
                done();
            });
    });

    it('should responds to a post request', function (done) {
        chai.request('localhost:3000')
            .post('/posts')
            .send(b)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Successfully saved the post content');
                done();
            });
    });

    // test put request method

    it('should respond a non-exist put request', function (done) {
        chai.request('localhost:3000')
            .put('/posts/54')
            .send(f)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Your request does not exist');
                done();
            });
    });

    it('should respond a put request', function (done) {
        chai.request('localhost:3000')
            .put('/posts/2')
            .send(e)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Successfully saved the post content');
                done();
            });
    });

    it('should return a content modified by a put request', function (done) {
        chai.request('localhost:3000')
            .get('/posts/2')
            .send()
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body).to.deep.eql(e);
                done();
            });
    });
});

