'use strict';
var fs = require('fs'),
    nextId = 0;
module.exports = function (req, res) {
    var filename,
        ws;

    function successResponse(code, msg) {
        res.writeHead(code, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(msg));
    }

    function errorResponse(code, msg) {
        res.writeHead(code, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(msg));
    }

    if (req.method === 'POST') {
        filename = './data/post-' + nextId + '.json';
        ws = fs.createWriteStream(filename);
        nextId++;
        req.pipe(ws);
        successResponse(200, {msg: 'Successfully saved the post content'});
    }

    if (req.method === 'GET') {
        filename = './data/post-' + req.parsedParam.id + '.json';
        fs.readFile(filename, function (err, data) {
            if (err) {
                errorResponse({msg: 'Your request does not exist'});
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(data.toString());
        });
    }

    if (req.method === 'PUT') {
        filename = './data/post-' + req.parsedParam.id + '.json';
        fs.exists(filename, function (exists) {
            if (!exists) {
                errorResponse(403, {msg: 'Your request does not exist'});
            } else {
                ws = fs.createWriteStream(filename);
                req.pipe(ws);
                successResponse(200, {msg: 'Successfully saved the post content'});
            }
        });
    }

    if (req.method === 'PATCH') {
        filename = './data/post-' + req.parsedParam.id + '.json';
        fs.exists(filename, function (exists) {
            if (!exists) {
                errorResponse(403, {msg: 'Your request does not exist'});
            } else {
                var input = '';
                req.on('data', function (data) {
                    input += data.toString();
                });
                req.on('end', function () {
                    input = JSON.parse(input);
                    fs.readFile(filename, function (err, data) {
                        if (err) {
                            errorResponse(503, {msg: 'Internal server error'});
                        }
                        var current = JSON.parse(data.toString());
                        for (var key in input) {
                            current[key] = input[key];
                        }
                        fs.writeFile(filename, JSON.stringify(current), function(err){
                            if (err) {
                                errorResponse(503, {msg: 'Internal server error'});
                            }
                            successResponse(200, {msg: 'Successfully saved the post content'});
                        })
                    });

                });
            }
        });
    }

    if (req.method === 'DELETE') {
        var filename = './data/post-' + req.parsedParam.id + '.json';
        fs.exists(filename, function (exists) {
            if (exists) {
                fs.unlink(filename, function (err) {
                    if (err) {
                        errorResponse(503, {msg: 'Internal server error'});
                    }
                    successResponse(200, {msg: 'Your content has been deleted successfully'});
                });
            } else {
                errorResponse(403, {msg: 'Your request does not exist'})
            }

        });
    }
};
