# Triveous eCommerce API

## Overview

This is a Node.js application that provides endpoints for managing carts, categories, orders, products, and users. This README file provides information on setting up the project and configuring the database.

## Table of Contents

1. [Setup](#setup)
2. [Database Configuration](#database-configuration)
3. [API Endpoints](#api-endpoints)
4. [Tags](#tags)
5. [Contact](#contact)

## Setup <a name="setup"></a>

#### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- PostgreSQL

#### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
2. Install dependencies:
    ```bash
    cd triveous-api
    npm install
## Database Configuration <a name="database-configuration"></a>
1. Create a PostgreSQL database for the project.
2. Create the .env file and add the below attribute to this file (You can set your own attributes)
    ```bash
    PORT=3000 
    DB_HOST="localhost"
    DB_PORT=5432
    DB_NAME="triveous"
    DB_USER="postgres"
    DB_PASS="root"
3. Run migrations to create database tables:
    ```bash
    npm run migration:up
## API Endpoints <a name="api-endpoints"></a>
> Swagger Url: [http://localhost:3000/api-docs/](http://localhost:3000/api-docs) \
> Base API Url: [http://localhost:3000/api/v1/triveous/](http://localhost:3000/api/v1/triveous)

##### Users
`POST` /users - **Create a new user** \
`PUT` /users - **Edit user information** \
`POST` /users/login - **User login**
#####  Category
`POST` /category - **Add a parent category** \
`GET` /category - **Get all categories** \
`POST` /category/sub-category - **Add a sub-category** 
##### Products
`GET` /products - **Get all products** \
`POST` /products - **Add a new product** \
`GET` /products/{id} **Get a product by ID** \
`PUT` /products/{id} - **Edit a product by ID** \
`GET` /products/category/{name} - **Get products by category name** 
##### Cart
`POST` /cart - **Add a product to the cart** \
`PUT` /cart - **Remove a product from the cart** \
`DELETE` /cart - **Empty the cart** \
`GET` /cart - **Get cart items for the authenticated user** 
##### Orders
`POST` /orders/{cart_id} - **Place a new order using the specified cart ID** \
`GET` /orders - **Get all orders for the authenticated user** \
`GET` /orders/{order_id} - **Get details of a specific order by order ID**



## Tags <a name="tags"></a>
- **Cart:** Cart management
- **Category:** Category management
- **Orders:** Order management
- **Products:** Product management
 
## Contact <a name="contact"></a>
For any inquiries, contact:
Name: Krishna Viramgama
Email: krishnaviramgama2002@gmail.com
