const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Halo Dunia");
});

server.listen(3000, () => {
  console.log("Server test jalan di http://localhost:3000");
});