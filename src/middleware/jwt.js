const jwt = require("jsonwebtoken");
const { Member } = require("../models");

const verifyMember = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    token = token.split(" ")[1];
    const decodedToken = jwt.verify(token, "jwt_key");
    const memberCode = decodedToken.code;
    const member = await Member.findOne({ where: { code: memberCode } });
    if (!member) {
      return res.status(404).send({
        message: "Member not found",
      });
    }
    req.member = member;
    next();
  } catch (error) {
    res.status(417).send({ message: "Invalid token" });
  }
};

module.exports = verifyMember;
