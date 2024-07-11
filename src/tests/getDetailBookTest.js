const request = require("supertest");
const app = require("../app");
const { sequelize, Book } = require("../models");

describe("GET /v1/books", () => {
  const book = {};

  beforeAll(async () => {
    await sequelize.sync();
    await Book.sync({ alter: true });
    await Book.bulkCreate(book);
  });

  afterAll(async () => {
    await Book.destroy({ where: {} });
    await sequelize.close();
  });

  it("Should return an array of Books", async () => {
    const response = await request(app).get("/v1/books/detail/JK-45");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "OK", data: [] });
  });
});
