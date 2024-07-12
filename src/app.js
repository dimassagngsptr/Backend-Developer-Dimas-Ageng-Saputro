const express = require("express");
const db = require("./models");
const cors = require("cors");
const routes = require("./routes");
const swaggerJSDocs = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const app = express();
const PORT = process.env.PORT || 2000;
const HOST = process.env.HOST || "http://localhost";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Libraries API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/*.js"],
};

const swaggerDocs = swaggerJSDocs(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/v1", routes);

app.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log(`Server is running on ${HOST}:${PORT}`);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       required:
 *         - name
 *         - code
 *         - penaltyDate
 *         - isPenalty
 *       properties:
 *         id:
 *           type: Integer
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the User
 *         code:
 *           type: string
 *           description: The code of the User
 *         penaltyDate:
 *           type: Date
 *           description: Penalty Period Range
 *         isPenalty:
 *           type: boolean
 *           description: The penalty validation
 *           default: false
 *       example:
 *         id: 3
 *         name: john
 *         code: M003
 *         penaltyDate: 2024-07-12 01:00:40
 *         isPenalty: true
 */

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: The Member API
 */

/**
 * @swagger
 * /v1/members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: The list of all members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
/**
 * @swagger
 * /v1/members/detail:
 *   get:
 *     summary: Get detail members (bearer token)
 *     security:
 *        - bearerAuth: []
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: The list of all members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */

/**
 * @swagger
 * /v1/members/auth/register:
 *   post:
 *     summary: Register a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: Register successfully
 *         content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Register successfully
 *
 */
/**
 * @swagger
 * /v1/members/auth/login:
 *   post:
 *     summary: Login a member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - code
 *         - author
 *         - stock
 *       properties:
 *         id:
 *           type: Integer
 *           description: The auto-generated id of the Book
 *         title:
 *           type: string
 *           description: The title of the Book
 *         code:
 *           type: string
 *           description: The code of the Book
 *         author:
 *           type: string
 *           description: The author of the Book
 *         stock:
 *           type: Integer
 *           description: The stock of the Book
 *       example:
 *         id: 3
 *         title: Harry Potter
 *         code: JK-45
 *         author: J.K Rowling
 *         stock: 1
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The Books API
 */

/**
 * @swagger
 * /v1/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /v1/books/detail/{code}:
 *   get:
 *     summary: Get detail books
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The list of detail books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the Book
 *               code:
 *                  type: string
 *                  description: The code of the Book
 *               author:
 *                  type: string
 *                  description: The author of the Book
 *               stock:
 *                  type: Integer
 *                  description: The stock of the Book
 *     responses:
 *       200:
 *         description: Book created successfully
 *         content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book created successfully
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Borrow:
 *       type: object
 *       required:
 *         - bookCode
 *         - memberCode
 *         - borrowDate
 *         - returnDate
 *         - isReturn
 *       properties:
 *         id:
 *           type: Integer
 *           description: The auto-generated id of the Borrow book
 *         bookCode:
 *           type: string
 *           description: The bookCode of the Book
 *         memberCode:
 *           type: string
 *           description: The memberCode of the Book
 *         returnDate:
 *           type: string
 *           description: The returnDate of the Book
 *         borrowDate:
 *           type: Integer
 *           description: The borrowDate of the Book
 *         isReturn:
 *           type: boolean
 *           description: Whether the returnDate
 *       example:
 *         id: 1
 *         bookCode: JK-45
 *         memberCode: M001
 *         borrowDate: 2024-07-12 01:00:40
 *         returnDate: 2024-07-19 01:00:40
 *         isReturn: false
 */

/**
 * @swagger
 * tags:
 *   name: Borrows
 *   description: The Borrow API
 */

/**
 * @swagger
 * /v1/borrows:
 *   post:
 *     summary: Create a borrow request (bearer token)
 *     security:
 *       - bearerAuth: []
 *     tags: [Borrows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookCode:
 *                 type: string
 *                 description: The code of the Book
 *     responses:
 *       200:
 *         description: Success borrowed book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success borrowed book
 */

/**
 * @swagger
 * /v1/borrows/{bookCode}:
 *   patch:
 *     summary: Return a borrowed book (bearer token)
 *     parameters:
 *       - in: path
 *         name: bookCode
 *         schema:
 *           type: string
 *           required: true
 *     security:
 *       - bearerAuth: []
 *     tags: [Borrows]
 *     responses:
 *       200:
 *         description: Thank you for borrowing book in library
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thank you for borrowing book in library
 */

module.exports = app;
