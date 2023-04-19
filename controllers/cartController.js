const Cart = require("../models/Cart");
const User = require("../models/User");

exports.createCart = async (req, res) => {
  const { userId, products } = req.body;

  if (!userId || !products) {
    res.status(400);
    throw new Error("All fieds are required!");
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error("Not authorized to create cart");
  }

  const cart = await Cart.create({ userId, products });

  return res.status(200).json({ cart });
};

exports.updateCart = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  const cart = await Cart.findById(id);

  if (!cart) {
    res.status(400);
    throw new Error("Cart does not exist");
  }

  if (userId !== cart.userId) {
    res.status(400);
    throw new Error("Not authorized to perform this action");
  }

  const updatedCart = await Cart.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json(updatedCart);
};

exports.deleteProductCard = async (req, res) => {
  const id = req.params.id;
  const { userId, productId } = req.body;

  const cart = await Cart.findById(id);

  if (!cart) {
    res.status(400);
    throw new Error("Cart does not exist");
  }

  if (userId !== cart.userId) {
    res.status(400);
    throw new Error("Not authorized to perform this action");
  }

  if (!productId) {
    res.status(400);
    throw new Error("All fields required!");
  }

  const cartProduct = cart.products.filter((ct) => ct.productId !== productId);

  const newCart = {
    userId,
    products: cartProduct,
  };

  console.log(newCart);

  const updatedCart = await Cart.findByIdAndUpdate(
    id,
    {
      $set: newCart,
    },
    { new: true }
  );

  return res.status(200).json({ updatedCart });
};

exports.deleteAllCart = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  const cart = await Cart.findById(id);

  if (!cart) {
    res.status(400);
    throw new Error("Cart does not exist");
  }

  if (userId !== cart.userId) {
    res.status(400);
    throw new Error("Not authorized to perform this action");
  }

  const deletedCart = await Cart.findByIdAndDelete(id);
  return res.status(200).json({ deletedCart });
};

exports.getCart = async (req, res) => {
  const id = req.params.id;

  const carts = await Cart.find({ userId: id });

  if (carts.length < 1) {
    res.status(400);
    throw new Error("Unable to find cart");
  }

  return res.status(200).json({ carts });
};
