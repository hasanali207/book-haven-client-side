import axios from 'axios';
import React, { useState } from 'react';

const BorrowModal = ({ book }) => {
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(`https://server-book-haven.vercel.app/books/${book._id}`, { returnDate });
      // Handle success (e.g., close modal, update UI)
    } catch (error) {
      console.error('Error borrowing book:', error);
      // Handle error
    }
  };

  return (
    <div>
      <input
        type="date"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
      />
      <button>Return</button>
    </div>
  );
};

export default BorrowModal;