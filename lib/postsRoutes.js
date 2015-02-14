'use strict';
var fs = require('fs'),
    nextId = 0;
module.exports = function (req, res, id) {
    var fileName,
        ws, rs;
    if (req.method === 'POST') {
        ws = fs.createWriteStream('./data/' + 'post-' + nextId + '.json');
        nextId++;
        req.pipe(ws);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({a: 'a'}));
    }

    if (req.method === 'GET') {

        fs.readFile('./data/' + 'post-' + id + '.json', function (err, data) {
            if (err) {
                res.write('file not found!');
                res.end();
            }
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(data.toString());
        });
    }

    if (req.method === 'PUT') {
        ws = fs.createWriteStream('./data/' + 'post-' + id + '.json');
        req.pipe(ws);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({a: 'a'}));
    }

    if (req.method === 'DELETE') {

        var filename = './data/post-' + id + '.json';
        fs.exists(filename, function (exists) {
            if (exists) {
                fs.unlink(filename, function (err) {
                    if (err) {

                    }
                    console.log('test... delete');
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({a: 'a'}));
                });
            }
        });
    }
};
