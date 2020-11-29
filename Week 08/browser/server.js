const http = require('http');

http.createServer((req, res) => {
    let body = [];
    req.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString()); //数据暂存
    }).on('end', () => {
        //body = Buffer.concat(body).toString();
        body = (Buffer.concat([ Buffer.from(body.toString()) ])).toString();
        console.log("body", body); //
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('hello world\n');
    });
}).listen(8088);

console.log("server start");