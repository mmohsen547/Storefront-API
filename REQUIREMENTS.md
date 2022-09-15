# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
    - `GET` `/products`
    - Get list of all products.
- Show
    - `GET` `/products/:id`
    - GET the product of the specified id
- Create
    - `POST` `/products/create` `Token Required`
    - Required data `{price: "product price", name: "product name"}`
    - Create new product


#### Users
- Index
    - `GET` `/users` `Token Required`
    - Get all users.
- Show 
    - `GET` `/users/:id` `Token Required`
    - Get user with a specific id.
- Create
    - `POST` `/users/create`
    - Required data `{firstName: "first", lastName: "last", password: "password", username: "username"}`
    - Ceate new user
- authenticate
    - `POST` `/users/authenticate`
    - Required data `{username: "username", password: "password"}`     
    - Authenticate user.

#### Orders
- Current Order by user (args: user id)[token required]
    - `GET` `/users/:id/orders?status=current` `Token required`
    - Get current or completed orders depends on the status query prameter.
- get order details
    - `GET` `orders/:id` `Token required`
    - Return the details of the order with the specified id.

- submit order
    - `POST` `/orders/:id/submit` `Token required`
    - Change the order status from current to completed
- add product to order
    - `POST` `/orders/:id/AddProduct`
    - Required Data `{product_id: "product id", quantity: "quantity"}`
    - Add new product to order with a specific id
- create
    - `POST` `/orders/create` `Token required`
    -  Required data `{userID: "user id"}`       


## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- password
- username

#### Orders
- id
- user_id
- status of order (current or complete)

### order Products
- order_id
- product_id
- quantity

## Database Schema

#### users

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname varchar(55),
    lastname varchar(55),
    username varchar(255),
    password_hash varchar(255)
)
```

#### products
```sql 
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(55),
    price FLOAT
)
```

#### orders
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    status varchar(55)
);
```

#### order products
```sql
    CREATE TABLE order_products(
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id),
    quantity INT,
    PRIMARY KEY(order_id, product_id) 
);
```