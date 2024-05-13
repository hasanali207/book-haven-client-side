import React, { useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DetailsBook = () => {
  const items = useLoaderData();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());

  const handleBorrowed = async () => {
    const { _id, author, category, quantity, image, name, rating } = items;
    const user_email = user?.email;
    const return_date = startDate;

    const bookData = {
      author,
      category,
      quantity,
      return_date,
      image,
      name,
      rating,
      user_email,
    };

    console.log("Book Data:", bookData); // Log bookData

    try {
      const response = await axios.post("http://localhost:5000/borrow/", bookData);
      console.log("Response:", response.data); 

      Swal.fire({
        title: "Borrowed Item Added",
        text: "Book Data is Added!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay",
      });
    } catch (error) {
      console.error("Error adding borrowed item:", error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto my-10 bg-white shadow-md rounded-md overflow-hidden">
        <img className="w-full h-64 object-cover" src={items?.image} alt="Product" />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">{items?.name}</h2>
          <p className="text-sm text-gray-600">Subcategory: {items?.category}</p>
          <p className="text-gray-700 mt-2">{items?.author}</p>
          <p className="text-gray-800 font-semibold mt-2">Rating: {items?.rating}</p>
          <p className="text-gray-800 font-semibold mt-2">Quantity: {items?.quantity}</p>
        </div>
        <button onClick={() => document.getElementById("my_modal_5").showModal()}>Borrowed</button>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form onSubmit={(e) => e.preventDefault()}>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              <button onClick={handleBorrowed} className="btn">Borrowed</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DetailsBook;
