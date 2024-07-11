const request = require("supertest");
const app = require("../app");
const { sequelize, Member } = require("../models");

describe("POST /v1/members/auth/register", () => {
  const newMember = {
    name: "John",
  };

  beforeAll(async () => {
    await sequelize.sync();
    await Member.sync({ alter: true });
  });

  afterAll(async () => {
    await Member.destroy({ where: {} });
    await sequelize.close();
  });

  it("Should create a new member", async () => {
    const response = await request(app)
      .post("/v1/members/auth/register")
      .send(newMember);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Register successfully");
  });
});
