# TokoABC

Welcome to TokoABC! This is a simple e-commerce API that allows you to manage items and orders.

## Setup

To set up the TokoABC project locally, follow these steps:

1. Clone the repository:
2. Install the project dependencies: Use -npm install
3. Configure the environment variables. Create a `.env` file in the project root directory and specify the following variables based on .env.example
4. Run prisma use : -npx prisma generate
5. Create Database in mysql and then run migration use : -npx prisma migrate dev
6. Build & Start the server: npm run build and then npm start
7. The API server should now be running locally on `http://localhost:3000`.
8. Because we are using API from fakeStore, please kindly run this query on database
```js
INSERT INTO supplier (nama, url)
VALUES ('fakeStore', 'https://fakestoreapi.com/products');
```

## Endpoints

### Get Item
- **URL**: `http://localhost:3000/inventory`
- **Method**: `POST`
Retrieve information about a brand item.
- **Request Body**:
```js
{
    "sort":"asc",
    "filter": "",
    "brand": "fakeStore",
    "page": 1,
    "per_page": 2
}
```

- **Response**:
  - `200 OK`:
```js{
    "data": [
        {
            "id": 1,
            "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "price": 109.95,
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category": "men's clothing",
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "rating": {
                "rate": 3.9,
                "count": 120
            }
        },
        {
            "id": 2,
            "title": "Mens Casual Premium Slim Fit T-Shirts ",
            "price": 22.3,
            "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
            "category": "men's clothing",
            "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
            "rating": {
                "rate": 4.1,
                "count": 259
            }
        }
    ],
    "page": 1,
    "per_page": 2,
    "total": 20,
    "total_page": 10,
    "next": true,
    "prev": false
}
```
  - `404 Not Found`: Store Not Found.
  - `500 Internal Server Error`

### Get Orders

Retrieve a list of all orders.

- **URL**: `http://localhost:3000/orders`
- **Method**: `POST`
- **Request Body**:
```js
{
    "sort":"",
    "page": 1,
    "per_page": 2
}
```
- **Response**:
  - `200 OK`:
```js{
    "data": [
        {
            "order_id": 1,
            "nama_pemesan": "eddie",
            "alamat_pemesan": "puri",
            "item_id": 1,
            "quantity": 10,
            "total_price": 1099.5,
            "brand": "FAKESTORE",
            "created_at": "2023-06-29T12:08:25.000Z",
            "created_by": "Admin",
            "updated_at": "2023-06-29T12:08:40.000Z",
            "updated_by": null,
            "deleted_at": null,
            "deleted_by": null
        },
        {
            "order_id": 2,
            "nama_pemesan": "arie",
            "alamat_pemesan": "jakarta",
            "item_id": 1,
            "quantity": 5,
            "total_price": 549.75,
            "brand": "fakeStore",
            "created_at": "2023-06-29T05:34:31.000Z",
            "created_by": "admin",
            "updated_at": "2023-06-29T05:34:31.000Z",
            "updated_by": null,
            "deleted_at": null,
            "deleted_by": null
        }
    ],
    "page": 1,
    "per_page": 2,
    "total": 5,
    "total_page": 3,
    "next": true,
    "prev": false
}
```
  - `500 Internal Server Error`

### Create Order

Create a new order.

- **URL**: `/orders/create`
- **Method**: `POST`
- **Request Body**:
```js
{
    "nama_pemesan": "Arie",
    "alamat_pemesan": "Jakarta",
    "item_id": 10,
    "quantity": 5,
    "brand": "fakeStore",
    "created_by": "admin"
}
```
- **Response**:
  - `201 Created`:
```js{
    "order_id": 5,
    "nama_pemesan": "arie",
    "alamat_pemesan": "jakarta",
    "item_id": 20,
    "quantity": 5,
    "total_price": 64.95,
    "brand": "fakeStore",
    "created_at": "2023-06-29T06:14:55.000Z",
    "created_by": "admin",
    "updated_at": "2023-06-29T06:14:55.000Z",
    "updated_by": null,
    "deleted_at": null,
    "deleted_by": null
}
```
  - `404 Not Found`: Store Not Found.
  - `500 Internal Server Error`

## Usage

To use the TokoABC API, you need to have an HTTP client, such as Postman.

1. Make sure the API server is running.
2. Send requests to the appropriate endpoints using the specified methods and parameters.
3. Handle the responses accordingly based on the HTTP status codes.
