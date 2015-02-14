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

describe('test delete request', function () {
    var date = new time.Date().toString(),
        a = getRandomJsonObject(),
        b = getRandomJsonObject();

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

// test delete request method
    it('should respond a delete request', function (done) {
        chai.request('localhost:3000')
            .delete('/posts/3')
            .send()
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Your content has been deleted successfully');
                done();
            });
    });

    it('should respond a non-exist delete request', function (done) {
        chai.request('localhost:3000')
            .delete('/posts/66')
            .send()
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Your request does not exist');
                done();
            });
    });

});

