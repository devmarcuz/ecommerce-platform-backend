const axios = require("axios");

exports.getProducts = async (req, res) => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return res.status(200).json(response.data);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return res.status(200).json(response.data);
};

exports.getAllProductCategories = async (req, res) => {
  const response = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  return res.status(200).json(response.data);
};

exports.getProductCategory = async (req, res) => {
  const category = req.params.category;

  const resCategory = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );

  if (!resCategory.data.includes(category)) {
    res.status(400);
    throw new Error("Category does not exist");
  }

  const response = await axios.get(
    `https://fakestoreapi.com/products/category/${category}`
  );
  return res.status(200).json(response.data);
};
