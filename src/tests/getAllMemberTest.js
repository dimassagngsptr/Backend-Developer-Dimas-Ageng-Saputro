const request = require("supertest");
const app = require("../app");
const { sequelize, Member } = require("../models");

describe("GET /v1/books", () => {
  const member = [];

  beforeAll(async () => {
    await sequelize.sync();
    await Member.sync({ alter: true });
    await Member.bulkCreate(member);
  });

  afterAll(async () => {
    await Member.destroy({ where: {} });
    await sequelize.close();
  });

  it("Should return an array of Members", async () => {
    const response = await request(app).get("/v1/members");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "OK", data: [] });
  });
});
