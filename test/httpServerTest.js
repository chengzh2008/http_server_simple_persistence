'use strict';

var chai = require('chai'),
    chaihttp = require('chai-http'),
    time = require('time'),
    expect = chai.expect;

require('../http_server');

chai.use(chaihttp);


describe('simple post request', function () {
    var date = new time.Date().toString(),
        post = {
            author: "javascript",
            date: date,
            message: "This is the post text"
        };

    it('responds to a post request', function (done) {
        chai.request('localhost:3000')
            .post('/posts')
            .send(post)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.author).to.eql('javascript');
                expect(res.body.date).to.eql(date);
                done();
            });
    });
});
