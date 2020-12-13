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
        res.end(
        `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                #box span {
                    color: red;
                }
                .box span{
                    color: bule;
                }
            </style>
        </head>
        <body>
            <div id="box">
                <span>text text </span>
            </div>
            <div class="box">
                <span>text text </span>
            </div>
        </body>
        </html>`);
    });
}).listen(8088);
    
       
        

console.log("server start");
