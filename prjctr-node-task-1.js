const http = require("http");
const url = require("url");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url, false).pathname;
  const query = url.parse(req.url, true).query;

  console.log(query);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  if (pathname === "/" || pathname === "/hello") {
    if (query.name) {
      res.write(`Hello ${query.name}`);
    } else {
      res.write("Hello World");
    }

    res.end();
  }

  if (pathname === "/goodbye") {
    if (query.name) {
      res.write(`Goodbye ${query.name}`);
    } else {
      res.write("Goodbye");
    }

    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
