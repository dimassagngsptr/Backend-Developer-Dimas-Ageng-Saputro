const request = require("supertest");
const app = require("../app");
const { sequelize, Book } = require("../models");

describe("POST /v1/books", () => {
  const newBook = {
    code: "JK-45",
    title: "Harry Potter",
    author: "J.K Rowling",
    stock: 1,
  };

  beforeAll(async () => {
    await sequelize.sync();
    await Book.sync({ alter: true });
  });

  afterAll(async () => {
    await Book.destroy({ where: {} });
    await sequelize.close();
  });

  it("Should create a new book", async () => {
    const response = await request(app).post("/v1/books").send(newBook);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Book created");
  });

  it("Should return 400 if book data is incomplete", async () => {
    const incompleteBook = {
      code: "NEW-2",
      title: "Incomplete Book",
      stock: 1,
    };

    const response = await request(app).post("/v1/books").send(incompleteBook);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Please provide all required fields.");
  });
});
