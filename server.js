const http = require("http");
const PORT = 8080;
const app = require("./api/app");
const server = http.createServer(app);
server.listen(PORT,() => {
    console.log(`listening on port ${PORT}`);
});