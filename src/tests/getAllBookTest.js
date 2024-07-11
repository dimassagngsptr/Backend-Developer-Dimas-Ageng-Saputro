const request = require("supertest");
const app = require("../app");
const { sequelize, Book } = require("../models");

describe("GET /v1/books", () => {
  const books = [];

  beforeAll(async () => {
    await sequelize.sync();
    await Book.sync({ alter: true });
    await Book.bulkCreate(books);
  });

  afterAll(async () => {
    await Book.destroy({ where: {} });
    await sequelize.close();
  });

  it("Should return an array of books", async () => {
    const response = await request(app).get("/v1/books");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "OK", data: [] });
  });
});
