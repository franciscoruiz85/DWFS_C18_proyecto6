const express = require('express');
const userRouter = express.Router();
const auth = require('../middleware/authorization');
const {
    createUser,
    loginUser,
    verifyUser,
    getUsers,
    updateUserById,
    deleteUserById
} = require('../controllers/user.controller');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *     id:
 *      type: object
 *      description: Identificador del registro en mongoDB
 *      example: 683b8ae9531ab30a4ea4984f
 *     username:
 *      type: string
 *      description: Nombre del usuario
 *     email:
 *      type: string
 *      description: Correo electrónico del usuario
 *     password:
 *      type: string
 *      description: Contraseña del usuario
 *    required:
 *     - username
 *     - email
 *     - password
 *    example:
 *     username: "John Doe"
 *     email: john.doe@email.com
 *     password: "123456"
 */

/**
 * @swagger
 * /api/users/create:
 *  post:
 *    summary: Register a new user
 *    tags: [User]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    responses:
 *     200:
 *      description: User registered successfully
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/User'
 *     400:
 *      description: Bad request
 *     500:
 *      description: Server error
 */
userRouter.post('/create', createUser);

/**
 * @swagger
 * /api/users/login:
 *  post:
 *    summary: Login user
 *    tags: [User]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    responses:
 *     200:
 *      description: User logged successfully
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/User'
 *     400:
 *      description: Bad request
 *     500:
 *      description: Server error
 */
userRouter.post('/login', loginUser);

userRouter.get('/verify-user', auth, verifyUser);

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get all users
 *    tags: [User]
 *    responses:
 *     200:
 *      description: Users retrieved successfully
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/User'
 *     400:
 *      description: Bad request
 *     500:
 *      description: Server error
 */
userRouter.get('/', getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Update a user by ID
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: User updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: User not found
 */
userRouter.put('/:id', auth, updateUserById);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Delete a user by ID
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User ID
 *    responses:
 *      200:
 *        description: User deleted successfully
 *      404:
 *        description: User not found
 */
userRouter.delete('/:id', auth, deleteUserById);

module.exports = userRouter;
