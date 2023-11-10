const Product = require("../models/ProductModel");
const { getPostData } = require("../utils");

// gets all the products avialable
// route = GET /api/products
async function index(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// Display the specified resource
// route = GET /api/products/:id
async function show(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// Store a newly created resource in storage.
// route = POST /api/products
async function store(req, res) {
  try {
    const body = await getPostData(req);

    const { name, description, price, img, category } = JSON.parse(body);

    const product = {
      name,
      description,
      price,
      category,
      img,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });

    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// Update the specified resource in storage.
// route = PUT /api/products/id
async function update(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const body = await getPostData(req);

      const { name, description, price, img, category } = JSON.parse(body);

      const productData = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        category: category || product.category,
        img: category || product.img,
      };

      const updProduct = await Product.update(id, productData);

      res.writeHead(200, { "Content-Type": "application/json" });

      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

// Display the specified resource
// route = GET /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      await Product.remove(id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Deleted Successfully" }));
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  index,
  show,
  store,
  update,
  deleteProduct,
};
