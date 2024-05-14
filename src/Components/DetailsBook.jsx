import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const DetailsBook = () => {
  const [items, setItems] = useState(useLoaderData()); // State to manage book details
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());

  const handleBorrowed = async () => {
    document.getElementById("my_modal_5").close();

    const { _id, author, category, quantity, image, name, rating } = items;
    const updatedQuantity = quantity - 1;
    const user_email = user?.email;
    const return_date = startDate;
    console.log(_id);
    const bookData = {
      author,
      setId: _id,
      category,
      quantity: updatedQuantity,
      return_date,
      image,
      name,
      rating,
      user_email,
    };

    console.log("Book Data:", bookData);

    fetch(`http://localhost:5000/borrowedBook/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    setItems({ ...items, quantity: updatedQuantity });
  };

  const handleBorrowedBook = () => {
    const { _id, author, category, quantity, image, name, rating } = items;
    const user_email = user?.email;
    const return_date = startDate;
    const updatedQuantity = quantity - 1;
    console.log(_id);
   
    const bookData = {
      setId: _id,
      author,
      category,
      quantity: updatedQuantity,
      return_date,
      image,
      name,
      rating,
      user_email,
    };
    // Add to borrowed books
    fetch(`http://localhost:5000/borrowed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
  };

  return (
    <>
      <div className="max-w-md mx-auto my-10 bg-white shadow-md rounded-md overflow-hidden">
        <img
          className="w-full h-64 object-cover"
          src={items?.image}
          alt="Product"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">{items?.name}</h2>
          <p className="text-sm text-gray-600">
            Subcategory: {items?.category}
          </p>
          <p className="text-gray-700 mt-2">{items?.author}</p>
          <p className="text-gray-800 font-semibold mt-2">
            Rating: {items?.rating}
          </p>
          <p className="text-gray-800 font-semibold mt-2">
            Quantity: {items?.quantity}
          </p>
        </div>
        {items.quantity > 0 ? (
          <button
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Borrowed
          </button>
        ) : (
          <button
            onClick={() => document.getElementById("my_modal_5").showModal()}
            disabled
          >
            Borrowed
          </button>
        )}
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form onSubmit={(e) => e.preventDefault()}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <button
                onClick={() => {
                  handleBorrowed();
                  handleBorrowedBook();
                }}
                className="btn"
              >
                Borrowed
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DetailsBook;
