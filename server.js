
const http = require('http')
const app = require('./src/app.js')
const server = http.createServer(app)

const port = process.env.PORT || 3000;

app.set('port', port)


server.listen(port, () => {
    console.log(`running in port ${port}`)
})