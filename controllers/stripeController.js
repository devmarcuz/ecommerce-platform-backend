require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Cart = require("../models/Cart");

exports.stripePayment = async (req, res) => {
  const { cartItems, cartId } = req.body;

  const cart = await Cart.findById(cartId);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice * 100,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });
};

exports.confirmPayment = async (req, res) => {
  const { paymentIntentId, cartId } = req.body;

  const cart = await Cart.findById(cartId);

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  console.log(paymentIntent.status);

  if (paymentIntent.status !== "succeeded") {
    res.status(400);
    throw new Error("Payment failed");
  }

  const payment = {
    paymentId: paymentIntent.id,
    amount: paymentIntent.amount / 100,
    status: payment.status,
  };

  // Clear the cart
  if (req.user._id !== cart.userId) {
    res.status(400);
    throw new Error("Not authorized to perform this action");
  }

  await Cart.findByIdAndDelete(id);
  res.status(200).json({ payment });
};
