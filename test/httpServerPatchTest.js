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

describe('test patch request', function () {
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

    // test patch request method
    it('should respond a patch request', function (done) {
        chai.request('localhost:3000')
            .put('/posts/3')
            .send({author: 'java', message: 'original message'})
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Successfully saved the post content');
                done();
            });
    });

    it('should respond a patch request', function (done) {
        chai.request('localhost:3000')
            .patch('/posts/3')
            .send({author: 'java patched', key: 'added value'})
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Successfully saved the post content');
                done();
            });
    });


    it('should return a content modified by a patch request', function (done) {
        chai.request('localhost:3000')
            .get('/posts/3')
            .send()
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body)
                    .to.deep.eql({  author: 'java patched',
                        key: 'added value',
                        message: 'original message'});
                done();
            });

    });


    it('should respond a non-exist patch request', function (done) {
        chai.request('localhost:3000')
            .patch('/posts/33')
            .send({author: 'java patched', key: 'added value'})
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('Your request does not exist');
                done();
            });
    });

});

