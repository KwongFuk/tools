const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const MOVIES_API_KEY = process.env.MOVIES_API_KEY;

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIES_API_KEY}&query=`;
const API_URL_HOME = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIES_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            content = content.replace('{{API_URL_HOME}}', API_URL_HOME);
            content = content.replace('{{SEARCH_API}}', SEARCH_API);

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
