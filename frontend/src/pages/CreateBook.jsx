import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import LoadingComp from '../components/LoadingComp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      description,
      publishYear,
    };
    setLoading(true);
    axios
      .post('http://localhost:5174/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Stored successfully.', { variant: 'success' });
        navigate('/home');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error!', { variant: 'error' });
        console.log(error);
      });
  };
  const backgroundImageStyle = {
    background: `url("data:image/jpeg;base64,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")`, // Replace with the actual base64 image data
    backgroundSize: 'cover',
    // backgroundPosition: 'center',
    minHeight: '100vh'
    
  };

  return (
    <div className='p-4' style={backgroundImageStyle}>
        

      <BackButton />
      <h1 className='text-3xl my-4 text-black'>Create Book</h1>
      {loading ? <LoadingComp /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateBook