const http = require('http');
const fs = require('fs');
const archiver = require('archiver');

//单文件
// fs.stat('./sample.html', (err, stats) => { //读取文件大小
//     let request = http.request({
//         hostname: '127.0.0.1',
//         port: 8081,
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/octet-stream',
//             'Content-Length': stats.size
//         }
//     }, response => {
//         console.log(response)
//     });
    
//     let file = fs.createReadStream("./sample.html");
//     file.pipe(request);
    
//     file.on("end", () => request.end())
// });

//多文件
let request = http.request({
    hostname: '127.0.0.1',
    port: 8081,
    method: "POST",
    headers: {
        'Content-Type': 'application/octet-stream',
        //'Content-Length': stats.size
    }
}, response => {
    console.log(response)
});

//let file = fs.createReadStream("./sample.html");

//对文件进行压缩
const achieve = archiver('zip', {
    zlib: {level: 9}
});
achieve.directory('./sample/', false);
achieve.pipe(request);
achieve.finalize();

// file.pipe(request);
// file.on("end", () => request.end())


// file.on('data', chunk => {
//     console.log(chunk.toString());
//     request.write(chunk);
// })
// file.on('end', chunk => {
//     console.log("read finish");
//     request.end(chunk);
// })