const Book = require('../models/Book');
const Review = require('../models/Review');

exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'title', order = 'asc', author, genre } = req.query;

    const query = {};
    if (author) query.author = author;
    if (genre) query.genre = genre;

    const books = await Book.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBooks = await Book.countDocuments(query);
    const totalPages = Math.ceil(totalBooks / limit);

    res.json({
      books,
      pagination: {
        totalBooks,
        totalPages,
        currentPage: Number(page),
        pageSize: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    const newBook = new Book({ title, author, genre, description });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
