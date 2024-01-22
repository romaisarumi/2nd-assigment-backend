import express from 'express';
import { Book } from '../models/bookModel.js';

const booksRoute = express.Router();

// To store a new Book
booksRoute.post('/', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.description ||
      !req.body.publishYear 
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      publishYear: req.body.publishYear
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// To see all Books stored in database
booksRoute.get('/', async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// To search a Book by id in database
booksRoute.post('/search', async (req, res) => {
  try {
    const title = req.body.title;

    const book = await Book.findOne({title});

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// To update a Book
booksRoute.put('/:id', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.description ||
      !req.body.publishYear 
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'The Book is updated successfully' });
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// To delete a Book
booksRoute.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'The Book is deleted successfully' });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});




export default booksRoute;
