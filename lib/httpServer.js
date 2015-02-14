'use strict';

var http = require('http'),
    postsRoutes = require('./postsRoutes'),
    routes = {
        'posts': postsRoutes
    },
    path,
    server = http.createServer(function (req, res) {
        var pathParam = getPathParam(req);
            req.parsedParam = {
            resource: pathParam[0],
            id: pathParam[1]
        };

        if (typeof (routes[pathParam[0]]) === 'function') {
            routes[req.parsedParam.resource](req, res);
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

// return an array contains the path info
// such as, "/posts/id" will return ['posts', 'id']
// "/posts" will return ['posts', undefined]
function getPathParam(req) {
    var regex = /^\/(\w+)(?:\/)?(\w+)?/g;
    path = regex.exec(req.url).slice(1);
    return path;
}
