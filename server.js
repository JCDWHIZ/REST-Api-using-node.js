const http = require("http");
const {
  index,
  show,
  store,
  update,
  deleteProduct,
} = require("./controllers/ProductsController");

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    index(req, res);
  } else if (
    req.url.match(/\api\/products\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    show(req, res, id);
  } else if (req.url === "/api/products" && req.method === "POST") {
    store(req, res);
  } else if (
    req.url.match(/\api\/products\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    update(req, res, id);
  } else if (
    req.url.match(/\api\/products\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
