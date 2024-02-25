/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.raw(`
  CREATE TABLE users (
    "id" uuid DEFAULT gen_random_uuid(),
    name VARCHAR(255),
   email_address VARCHAR(350),
   phone_number VARCHAR(20),
   password VARCHAR(500),
   CONSTRAINT pk_user PRIMARY KEY (id)
   );
    
  CREATE TABLE product_category (
    "id" uuid DEFAULT gen_random_uuid(),
   parent_category_id UUID,
   category_name VARCHAR(200),
   CONSTRAINT pk_category PRIMARY KEY (id),
   CONSTRAINT fk_category_parent FOREIGN KEY (parent_category_id) REFERENCES product_category (id)
   );
  
  CREATE TABLE product (
    "id" uuid DEFAULT gen_random_uuid(),
   category_id UUID,
   name VARCHAR(500),
   description VARCHAR(4000),
   qty_in_stock INT,
   price INT,
   product_image VARCHAR(1000),
   CONSTRAINT pk_product PRIMARY KEY (id)
   );
  
  CREATE TABLE shopping_cart (
    "id" uuid DEFAULT gen_random_uuid(),
   user_id UUID,
   CONSTRAINT pk_shopcart PRIMARY KEY (id),
   CONSTRAINT fk_shopcart_user FOREIGN KEY (user_id) REFERENCES users (id)
   );
  
  CREATE TABLE shopping_cart_item (
    "id" uuid DEFAULT gen_random_uuid(),
   cart_id UUID,
   product_id UUID,
   qty INT,
   price INT,
   total_product_price INT,
   CONSTRAINT pk_shopcartitem PRIMARY KEY (id),
   CONSTRAINT fk_shopcartitem_shopcart FOREIGN KEY (cart_id) REFERENCES shopping_cart (id),
   CONSTRAINT fk_shopcartitem_proditem FOREIGN KEY (product_id) REFERENCES product (id)
   );

  CREATE TABLE shop_order (
    "id" uuid DEFAULT gen_random_uuid(),
    user_id UUID,
    cart_id UUID,
    order_date TIMESTAMP,
    order_total INT,
    order_status varchar(255),
    CONSTRAINT pk_shoporder PRIMARY KEY (id),
    CONSTRAINT fk_shoporder_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_shopcart FOREIGN KEY (cart_id) REFERENCES shopping_cart (id)
  );
  
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.raw(`
  DROP TABLE IF EXISTS shop_order;
  DROP TABLE IF EXISTS shopping_cart_item;
  DROP TABLE IF EXISTS shopping_cart;
  DROP TABLE IF EXISTS product;
  DROP TABLE IF EXISTS product_category;
  DROP TABLE IF EXISTS users;
  `)
};
