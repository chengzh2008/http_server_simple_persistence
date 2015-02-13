'use strict';

var http = require('http'),
    postsRoutes = require('./postsRoutes'),
    routes = {
        'posts': postsRoutes
    },
    path,
    server = http.createServer(function (req, res) {
        var pathParam = getPathParam(req);
        console.log(pathParam);
        if (typeof (routes[pathParam[0]]) === 'function') {
            routes[pathParam[0]](req, res, pathParam[1]);
        } else {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });

            res.write(JSON.stringify({msg: 'page not found'}));
            res.end();
        }
    });

server.listen(3000, function () {
    console.log('server listening');
});


function getPathParam(req) {
    var regex = /^\/(\w+)(?:\/)?(\w+)?/g;
    path = regex.exec(req.url).slice(1);
    return path;
}
