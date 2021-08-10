const http = require('http');
const { readFileSync } = require('fs');

const homepage = readFileSync('./index.html');
const server = http.createServer((req, res)=>{
    if (req.url === '/') {
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(homepage);
        res.end()
    }
});

server.listen(8000);

console.log('server started')