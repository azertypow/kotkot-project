/**
 * Created by azertypow on 11/04/2017.
 */

import http = require("http");
import url = require("url");
import path = require("path");
import fs = require("fs");

export default class StaticServer {

    public static run(setPort: string = "8888" ): http.Server {

        let port: string = process.argv[2] || setPort;

        const httpServer: any = http.createServer( (request: http.IncomingMessage, response: http.ServerResponse) => {

            const uri: string = url.parse(request.url).pathname;
            let filename: string = path.join(process.cwd(), uri);

            fs.exists(filename, (exists: boolean) => {
                if(!exists) {
                    response.writeHead(404, {"Content-Type": "text/plain"});
                    response.write("404 Not Found\n");
                    response.end();
                    return;
                }

                else if (fs.statSync(filename).isDirectory()) {
                    filename += '/index.html';
                }

                fs.readFile(filename, "binary", (err: Error, file: Buffer)=>{
                    if(err) {
                        response.writeHead(500, {"Content-Type": "text/plain"});
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