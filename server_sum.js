const http = require('http');
const url = require('url');

// ВАЖНО:
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    if ((parsedUrl.pathname === '/sum' || parsedUrl.pathname === '/sum/') && req.method === 'GET') {
        const a = parseFloat(query.a);
        const b = parseFloat(query.b);

        if (isNaN(a) || isNaN(b)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                error: 'Parameters "a" and "b" must be valid numbers'
            }));
            return;
        }

        const sum = a + b;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ a, b, sum }));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Route not found. Use /sum?a=<number>&b=<number>'
        }));
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
