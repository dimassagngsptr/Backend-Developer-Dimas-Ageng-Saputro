const jwt = require("jsonwebtoken");
const { Member, Borrow } = require("../models");
const checkPenalties = require("../utils/checkPenalties");

module.exports = {
  getAllMembers: async (_, res) => {
    try {
      const results = await Member.findAll();
      res.status(200).send({ message: "OK", data: results });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  },
  getDetailMember: async (req, res) => {
    const member = req.member;
    try {
      const detailMember = await Member.findOne({
        where: { code: member.code },
        include: [
          {
            model: Borrow,
            attributes: [
              "id",
              "bookCode",
              "isReturn",
              "borrowDate",
              "returnDate",
            ],
          },
        ],
      });
      res.status(200).send({ message: "OK", data: detailMember });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  },
  registerMember: async (req, res) => {
    const { name } = req.body;
    try {
      const isExist = await Member.findOne({ where: { name } });
      if (isExist) {
        return res.status(409).send({ message: "Member already exists" });
      }
      const results = await Member.findAll();
      let code = results.length;
      code += 1;
      await Member.create({
        name: name,
        code: `M00${code}`,
      });

      res.status(201).send({ message: "Register successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  },
  loginMember: async (req, res) => {
    const { name } = req.body;
    try {
      const isExist = await Member.findOne({ where: { name } });
      const itemBorrow = await Borrow.findAll({
        where: {
          memberCode: isExist.code,
          isReturn: false,
        },
      });
      if (itemBorrow.length > 0) {
        const check = checkPenalties(itemBorrow);
        console.log(check);
        if (check) {
          const penaltyDate = new Date();
          penaltyDate.setDate(penaltyDate.getDate() + 3);
          await Member.update(
            { isPenalty: true, penaltyDate: penaltyDate },
            { where: { code: isExist.code } }
          );
        }
      }
      if (!isExist) {
        return res.status(404).send({ message: "Member not found" });
      }
      const payload = { code: isExist.code };
      const token = jwt.sign(payload, "jwt_key", { expiresIn: "24h" });
      res
        .status(200)
        .send({ message: "Login successful", data: isExist, token: token });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  },
};
