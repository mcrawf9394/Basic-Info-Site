const http = require('http')
const path = require('path')
const fs = require('fs')
const server = http.createServer((req,res) => {
    let filePath = path.join(
        __dirname,
        'projects',
        req.url === '/' ? 'index.html' :
        `${req.url}.html`
    )
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'projects', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(content, "utf8")
                })
            } else {
                res.writeHead(500);
                res.end(`server error: ${err.code}`)
            }
        } else {
            res.writeHead(200, {'Content-Type': 'utf8'})
            res.end(content, 'utf8')
        }
    })
})
const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`server running on port ${PORT}`))