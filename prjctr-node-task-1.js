const http = require("http");
const url = require("url");

const hostname = "127.0.0.1";
const port = 3000;
const ROUTES = {
  main: "/",
  hello: "/hello",
  goodbye: "/goodbye",
};

const STATUS_CODES = {
  success: 200,
  notFound: 404,
  notAllowed: 405,
};

const REQUEST_METHODS = {
  get: "GET",
  post: "POST",
};

function helloRoute(query) {
  return {
    response: query.name ? `Hello ${query.name}` : "Hello World",
    code: STATUS_CODES.success,
  };
}

function goodbyeRoute(query) {
  return {
    response: query.name ? `Goodbye ${query.name}` : "Goodbye",
    code: STATUS_CODES.success,
  };
}

function notFoundRoute() {
  return {
    response: "Not found",
    code: STATUS_CODES.notFound,
  };
}

function setStatusCode(res, statusCode) {
  res.statusCode = statusCode;
}

function writeBody(res, bodyContent) {
  res.write(bodyContent);
}

function resolveRoutes(pathname, query) {
  switch (pathname) {
    case ROUTES.main:
    case ROUTES.hello:
      return helloRoute(query);

    case ROUTES.goodbye:
      return goodbyeRoute(query);

    default:
      return notFoundRoute();
  }
}

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url, false).pathname;
  const query = url.parse(req.url, true).query;
  const method = req.method;

  res.setHeader("Content-Type", "text/plain");

  if (method === REQUEST_METHODS.get) {
    const resolvedDetails = resolveRoutes(pathname, query);

    setStatusCode(res, resolvedDetails.code);
    writeBody(res, resolvedDetails.response);
  }

  if (method === REQUEST_METHODS.post) {
    setStatusCode(res, STATUS_CODES.notAllowed);
    writeBody(res, "Not allowed");
  }

  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
