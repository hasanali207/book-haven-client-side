import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import SingleBorrowBook from '../Components/SingleBorrowBook';
import axios from 'axios';

export default function BorrowedBooks() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  console.log(items)
  console.log(user)
  useEffect(() => {
   fetch(`http://localhost:5000/getbrrowedbook/${user?.email}`)
   .then (res => res.json())
   .then (data => setItems(data))

  }, [user?.email]);

  const handleReturn = async (borrowedBookId) => {
    
  };

  return (
    <>
     
      <div className='grid grid-cols-3 gap-6'>
        { items.map(item => <SingleBorrowBook key={item._id} handleReturn={handleReturn} item={item} />)}
      </div>
    </>
  );
}
