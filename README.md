# Technical Challenge

Implement HTTP API client and use it to query the data. Your solution
should be a simple console application which, when run, queries API and
outputs results to the terminal.

**Note:** You can use online resources to lookup up framework and libraries
documentation and usage examples, but notify what exactly you're looking for.

## API

Default API base URL: https://my-json-server.typicode.com/alex-solovey/challenge

All API endpoints return `application/json` data.

### Resources

* [`/users`](https://my-json-server.typicode.com/alex-solovey/challenge/users) - users.
* [`/products`](https://my-json-server.typicode.com/alex-solovey/challenge/products) - products.
* [`/orders`](https://my-json-server.typicode.com/alex-solovey/challenge/orders) - orders.

Resources have relations:

* Orders belong to users. A user may have multiple orders, or no orders at all.
* Order contains multiple items: product, count and price.
* Product may be included in multiple orders.

Note: product prices change over the time. Products resource reports the current product price;
order items include historical price of the product at the time of the order.

### Endpoints

Only `GET` requests are used in this challenge.

* `GET` [`/users`](https://my-json-server.typicode.com/alex-solovey/challenge/users) - get all users.
* `GET` [`/users/{id}`](https://my-json-server.typicode.com/alex-solovey/challenge/users/71880) - get single user by ID.
* `GET` [`/products`](https://my-json-server.typicode.com/alex-solovey/challenge/products) - get all products.
* `GET` [`/products/{id}`](https://my-json-server.typicode.com/alex-solovey/challenge/products/90020) - get single product by ID.
* `GET` [`/orders`](https://my-json-server.typicode.com/alex-solovey/challenge/orders) - get all orders.
* `GET` [`/orders/{id}`](https://my-json-server.typicode.com/alex-solovey/challenge/orders/22300) - get single order by ID.


## Tasks

### A. Define data contract models for API endpoints

Your code should be able to deserialize JSON responses into C# objects.

### B. Implement HTTP client to retrieve data from API

API client should support all endpoints listed above. API base URL should be configurable, so it should be possible to use a different URL instead of default if needed.

### C. Find and output the following results:

1. Minimum, maximum, mean and median spend (total orders amount) per user. Note: exclude users without orders.
2. Minimum, maximum, mean and median count and amount of orders for each month that has orders.
3. The most popular product (the one with the highest number of items sold).
4. The product with the highest revenue.
5. Median monthly product price change (only for products that were included in orders).

### D. Implement tests

Use any testing framework of your choice. Consider both unit and integration tests.
