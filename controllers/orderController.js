const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { userId, address, amount, products } = req.body;

  if (!userId || !address || !amount || !products) {
    res.status(400);
    throw new Error("All fields required!");
  }

  const order = await Order.create(req.body);
  return res.status(200).json({ order });
};

exports.getUserOrder = async (req, res) => {
  const id = req.params.id;

  const orders = await Order.find({ userId: id });

  if (orders.length < 1) {
    res.status(400);
    throw new Error("Unable to find orders");
  }

  return res.status(200).json({ orders });
};
