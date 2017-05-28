"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
class StaticServer {
    static run(setPort = "8888") {
        let port = process.argv[2] || setPort;
        const httpServer = http.createServer((request, response) => {
            const uri = url.parse(request.url).pathname;
            let filename = path.join(process.cwd(), uri);
            fs.exists(filename, (exists) => {
                if (!exists) {
                    response.writeHead(404, { "Content-Type": "text/plain" });
                    response.write("404 Not Found\n");
                    response.end();
                    return;
                }
                else if (fs.statSync(filename).isDirectory()) {
                    filename += '/index.html';
                }
                fs.readFile(filename, "binary", (err, file) => {
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
        console.log(`Static file server running at\n  => http://localhost:"${port}"/\nCTRL + C to shutdown`);
        return httpServer.listen(parseInt(port, 10));
    }
}
exports.default = StaticServer;
