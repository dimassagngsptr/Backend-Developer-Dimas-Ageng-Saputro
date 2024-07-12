const { Book, Member, Borrow } = require("../models");
const formatDate = require("../utils/formatDate");

module.exports = {
  borrowBook: async (req, res) => {
    const { bookCode } = req.body;
    const member = req.member;
    try {
      const today = new Date();
      const memberExist = await Member.findOne({
        where: { code: member.code },
      });
      if (memberExist.isPenalty === true) {
        return res.status(403).send({
          message:
            "You are in penalty period, please return the book and wait for 3 days",
        });
      }
      if (memberExist.penaltyDate) {
        const penaltyDate = new Date(memberExist.penaltyDate);
        if (today < penaltyDate) {
          const diffTime = penaltyDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return res.status(403).send({
            message: `You can only borrow books after ${diffDays} more days`,
          });
        }
      }
      const itemBorrow = await Borrow.findAll({
        where: {
          memberCode: member.code,
          isReturn: false,
        },
      });
      if (itemBorrow.length >= 2) {
        return res
          .status(403)
          .send({ message: "You have reached your book borrowing limit" });
      }
      const result = await Book.findOne({ where: { code: bookCode } });
      if (!result) {
        return res.status(404).send({ message: "Book not found" });
      }
      if (result.stock < 1) {
        return res.status(406).send({ message: "Book out of stock" });
      }

      const returnDate = new Date();
      returnDate.setDate(today.getDate() + 7);
      const create = await Borrow.create({
        memberCode: member.code,
        bookCode: bookCode,
        borrowDate: today,
        returnDate: returnDate,
        BookId: result.id,
        MemberId: memberExist.id,
      });
      result.stock -= 1;
      await result.save();
      res.status(200).send({ message: "Success borrowed book", data: create });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error: error });
    }
  },

  returnBook: async (req, res) => {
    const member = req.member;
    const { bookCode } = req.params;
    try {
      const today = new Date();
      const borrowBookMember = await Borrow.findOne({
        where: {
          bookCode,
          memberCode: member.code,
        },
      });

      if (!borrowBookMember) {
        return res.status(404).send({ message: "Item not found" });
      }
      if (borrowBookMember.isReturn === true) {
        return res.status(400).send({ message: "You have returned this book" });
      }
      if (today > new Date(borrowBookMember.returnDate)) {
        await Borrow.update(
          {
            isReturn: true,
          },
          {
            where: {
              bookCode,
              memberCode: member.code,
            },
          }
        );
        const penaltyDate = new Date();
        penaltyDate.setDate(today.getDate() + 3);
        await Member.update(
          {
            isPenalty: true,
            penaltyDate,
          },
          { where: { code: member.code } }
        );
        const formattedPenaltyDate = formatDate(penaltyDate);
        res.status(200).send({
          message: `You late to return the book, now that you have the penalty until ${formattedPenaltyDate}`,
        });
      } else {
        await Borrow.update(
          {
            isReturn: true,
          },
          {
            where: {
              bookCode,
              memberCode: member.code,
            },
          }
        );
        res
          .status(200)
          .send({ message: `Thank you for borrowing book in library` });
      }
      const book = await Book.findOne({ where: { code: bookCode } });
      book.stock += 1;
      await book.save();
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  },
};
