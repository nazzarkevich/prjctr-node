const http = require("http");
const url = require("url");

const hostname = "127.0.0.1";
const port = 3000;

function helloRoute(query) {
  return query.name ? `Hello ${query.name}` : "Hello World";
}

function goodbyeRoute(query) {
  return query.name ? `Goodbye ${query.name}` : "Goodbye";
}

function notFoundRoute() {
  return "404";
}

function resolveRoutes(pathname, query) {
  switch (pathname) {
    case "/":
    case "/hello":
      return helloRoute(query);

    case "/goodbye":
      return goodbyeRoute(query);

    default:
      return notFoundRoute();
  }
}

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url, false).pathname;
  const query = url.parse(req.url, true).query;
  const method = req.method;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  if (method === "GET") {
    res.write(resolveRoutes(pathname, query));
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
