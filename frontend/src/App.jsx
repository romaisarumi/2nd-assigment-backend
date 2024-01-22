import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import ErrorPage from './pages/ErrorPage';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
