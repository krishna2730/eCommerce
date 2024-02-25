/**
 * @swagger
 * components:
 *   schemas:
 *     CartReq:
 *       type: object
 *       properties:
 *         product_id:
 *           type: string
 *       required:
 *         - product_id
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         cart_id:
 *           type: string
 *         product_id:
 *           type: string
 *         qty:
 *           type: integer
 *         price:
 *           type: number
 *         total_product_price:
 *           type: number
 *     CartItemDetail:
 *       type: object
 *       properties:
 *         length:
 *           type: integer
 *         cart:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         parentName:
 *           type: string
 *       required:
 *         - name
 *
 *     CategoryDetail:
 *       type: object
 *       properties:
 *         length:
 *           type: integer
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string  // Assuming the ID is a string, as per the provided example
 *         user_id:
 *           type: string
 *         cart_id:
 *           type: string
 *         order_date:
 *           type: string  // Assuming the order_date is in string format
 *         order_total:
 *           type: number
 *         order_status:
 *           type: string | null  // Assuming order_status can be a string or null
 *       required:
 *         - id
 *         - user_id
 *         - cart_id
 *         - order_date
 *         - order_total
 *
 *     OrderList:
 *       type: object
 *       properties:
 *         length:
 *           type: integer
 *         orders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     ProductReq:
 *       type: object
 *       properties:
 *         categoryName:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         product_image:
 *           type: string | null  
 *       required:
 *         - category_name
 *         - name
 *         - description
 *         - price
 * 
 *     ProductRes:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         category_id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         qty_in_stock:
 *           type: integer
 *         price:
 *           type: number
 *         product_image:
 *           type: string | null  // Assuming product_image can be a URL or null
 *       required:
 *         - category_id
 *         - name
 *         - description
 *         - qty_in_stock
 *         - price
 *
 *     ProductList:
 *       type: object
 *       properties:
 *         length:
 *           type: integer
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductRes'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email_address:
 *           type: string
 *         password:
 *           type: string
 *         phone_number:
 *           type: string
 *       required:
 *         - name
 *         - email_address
 *         - password
 *         - phone_number
 * 
 *     EditUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         phone_number:
 *           type: string
 * 
 *     Login:
 *       type: object
 *       properties:
 *         email_address:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email_address
 *         - password
 *
 *     TokenResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */