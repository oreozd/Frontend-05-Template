const http = require('http');
const fs = require('fs');
const unzipper = require('unzipper');

http.createServer((req, res) => {
    console.log(req.headers);
    let outFile = fs.createWriteStream("../server/public/tmp.zip");

    req.pipe(outFile);

    req.pipe(unzipper.Extract({ path: '../server/public/' }));
    // req.on('data', chunk => {
    //     outFile.write(chunk);
    // })
    // req.on('end', () => {
    //     outFile.end();
    //     res.end('success');
    // })
}).listen(8081);