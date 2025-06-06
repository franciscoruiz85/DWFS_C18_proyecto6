const express = require('express');
const productRouter = express.Router();
const auth = require('../middleware/authorization');
const {
    createProduct,
    getProducts,
    updateProductById,
    deleteProduct
} = require('../controllers/product.controller');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *     id:
 *      type: object
 *      description: Identificador del registro en mongoDB
 *      example: 68422ff3f20fbb940d8d6e2e
 *     productname:
 *      type: string
 *      description: Nombre del producto
 *     type:
 *      type: string
 *      description: Tipo de producto
 *     cc:
 *      type: number
 *      description: Centimetros cúbicos del producto
 *     price:
 *      type: number
 *      description: Precio del producto
 *    required:
 *     - productname
 *     - type
 *     - price
 *    example:
 *     productname: "Shopero Torobayo"
 *     type: "Glass"
 *     cc: 500
 *     price: 3500
 */

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Register a new product
 *    tags: [Product]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Product'
 *    security:
 *     - bearerAuth: []
 *    responses:
 *     200:
 *      description: Product registered successfully
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Product'
 *     404:
 *      description: Bad request
 *     500:
 *      description: Server error
 */
productRouter.post('/', auth, createProduct);

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get all products
 *    tags: [Product]
 *    responses:
 *     200:
 *      description: Products retrieved successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Product'
 *     404:
 *      description: Bad request
 *     500:
 *      description: Server error
 */
productRouter.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product by ID
 *    tags: [Product]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Product ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: Product updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *      500:
 *        description: Server error
 */
productRouter.put('/:id', auth, updateProductById);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product by ID
 *    tags: [Product]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Product ID
 *    responses:
 *      200:
 *        description: Product deleted successfully
 *      404:
 *        description: Product not found
 *      500:
 *        description: Server error
 */
productRouter.delete('/:id', auth, deleteProduct);

module.exports = productRouter;
