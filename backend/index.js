import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/booksRoute.js';
import User from './routes/user.js';
const mongoDBURL = 'mongodb+srv://Mrbook:Mrbook@cluster0.woi2v9q.mongodb.net/'

const app = express();

const PORT = 5174;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());


app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome To MERN Stack Tutorial');
});

// Books Route
app.use('/books', booksRoute);
app.use(User);


// Connecting to the Database and Running the Server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database successfully!');
    
    app.listen(PORT, () => console.log(`App is listening to port: ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
