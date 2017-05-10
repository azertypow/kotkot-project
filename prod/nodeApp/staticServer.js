"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var StaticServer = (function () {
    function StaticServer() {
    }
    StaticServer.run = function (setPort) {
        if (setPort === void 0) { setPort = "8888"; }
        var port = process.argv[2] || setPort;
        var httpServer = http.createServer(function (request, response) {
            var uri = url.parse(request.url).pathname;
            var filename = path.join(process.cwd(), uri);
            fs.exists(filename, function (exists) {
                if (!exists) {
                    response.writeHead(404, { "Content-Type": "text/plain" });
                    response.write("404 Not Found\n");
                    response.end();
                    return;
                }
                else if (fs.statSync(filename).isDirectory()) {
                    filename += '/index.html';
                }
                fs.readFile(filename, "binary", function (err, file) {
                    if (err) {
                        response.writeHead(500, { "Content-Type": "text/plain" });
                        response.write(err + "\n");
                        response.end();
                        return;
                    }
                    response.writeHead(200);
                    response.write(file, "binary");
                    response.end();
                });
            });
        });
        console.log("Static file server running at\n  => http://localhost:\"" + port + "\"/\nCTRL + C to shutdown");
        return httpServer.listen(parseInt(port, 10));
    };
    return StaticServer;
}());
exports.default = StaticServer;
