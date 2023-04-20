# Ecommerce Platform Backend

This is the backend for an ecommerce platform, built with Node.js, Express.js and MongoDB

## Installation

1. Clone the respository to your local machine: `git clone https://github.com/devmarcuz/ecommerce-platform-backend.git`
2. Install dependencies by running `npm install`
3. Create a `.env` file based on the example `.env.example` file and update the values as needed

```vbnet
MONGO_URI=<your MongoDB connection string>
PORT=5000
STRIPE_KEY=<your Sripe secret key>
```

4. Start the server with `npm start`

## API Routing

This backend component provides the following endpoints:

### Authentication endpoints

- POST `/api/v1/auth/register`: create a new user account
- POST `/api/v1/auth/login`: log in with an existing user account

### User endpoints

- GET `/api/v1/users/user/:id`: get user's information.
- PUT `/api/v1/users/update-user/:id`: update a user's information
- GET `/api/v1/users`: get all users information

### Product endpoints

- GET `/api/v1/products`: get a list of all products
- GET `/api/v1/products/:id`: get single product by ID
- GET `/api/v1/categories`: get all categories
- GET `/api/v1/categories/category/:category`: get all products by category

### Order endpoints

- POST `/api/v1/orders/create`: create a new order
- Get `/api/v1/orders/find/:id`: get an order's information

### Cart endpoints

- POST `/api/v1/carts/create`: adds a product to the user's cart
- DELETE `/api/v1/carts/remove-product/:id`: removes a product from the user's cart
- GET `/api/v1/carts/:id`: get the user's cart details by the UserID
- PUT `/api/v1/carts/update/:id`: updates the user's cart
- DELETE `/api/v1/carts/remove-cart/:id`: clears all products from the user's cart

### Stripe endpoints

- POST `/api/v1/checkouts/payment`: create a new payment intent
- POST `/api/v1/checkouts/confirm-payment`: to check user's payment status

## Credits

This project was created by [Otunba Marcus](https://github.com/devmarcuz). It uses [fakestoresapi.com](https://fakestoresapi.com)
to fetch the products
