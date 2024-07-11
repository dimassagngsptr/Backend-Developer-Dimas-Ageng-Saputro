const { Book } = require("../models");

module.exports = {
  getAllBooks: async (_, res) => {
    try {
      const result = await Book.findAll();
      res.status(200).send({ message: "OK", data: result });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  },
  getDetailBook: async (req, res) => {
    const { code } = req.params;
    try {
      const bookDetail = await Book.findOne({ where: { code } });
      if (!bookDetail) {
        return res.status(404).send({ message: "Book not found" });
      }
      res.status(200).send({ message: "OK", data: bookDetail });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  },
  addBooks: async (req, res) => {
    const { code, title, author, stock } = req.body;
    try {
      if (!code || !title || !author || !stock) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields." });
      }
      const isExist = await Book.findOne({ where: { code } });
      if (isExist) {
        return res.status(409).send({ message: "Book already exists" });
      }
      await Book.create({
        code,
        title,
        author,
        stock,
      });
      res.status(201).send({ message: "Book created" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Internal Server Error", error: error.message });
    }
  },
};
