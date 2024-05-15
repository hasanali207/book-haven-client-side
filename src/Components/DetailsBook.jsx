import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const DetailsBook = () => {
  const [items, setItems] = useState(useLoaderData()); // State to manage book details
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [userEmail, setUserEmail] = useState("");

  console.log(user);
  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);

  const handlecheckBorrwedBook = async () => {
    if(items.librian_email == user?.email){
      return  toast.error("You Are Librian Can nto Borrowed this book!");
    }

    if (!userEmail) {
      // User email not available
      return;
    }

    const response = await fetch(
      `https://server-book-haven.vercel.app/getbrrowedbook/${userEmail}`
    );
    const borrowedBooksData = await response.json();

    const alreadyBorrowed = borrowedBooksData.find(
      (item) => item.setId === items._id
    );

    if (alreadyBorrowed) {
      toast.error("You have already borrowed this book!");
    } else {
      document.getElementById("my_modal_5").showModal();
    }
  };

  const handleBorrowed = async () => {
    document.getElementById("my_modal_5").close();

    const { _id, author, category, quantity, image, name, rating } = items;
    const updatedQuantity = quantity - 1;
    const user_email = user?.email;
    const user_name = user?.displayName;
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
      user_name,
    };

    console.log("Book Data:", bookData);

    fetch(`https://server-book-haven.vercel.app/borrowedBook/${_id}`, {
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
    const user_name = user?.displayName;
    const return_date = startDate;
    const updatedQuantity = quantity - 1;
    console.log(_id);
    const borrowedDate = new Date();
    const bookData = {
      setId: _id,
      author: category,
      quantity: updatedQuantity,
      return_date,
      image,
      name,
      rating,
      user_email,
      user_name,
      borrowedDate,
    };
    // Add to borrowed books
    fetch(`https://server-book-haven.vercel.app/borrowed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
  };

  return (
    <>
      <div className=" flex w-2/3 mx-auto my-10 bg-white shadow-md rounded-md overflow-hidden">
        <figure>
          <img
            className="w-full h-64 object-cover"
            src={items?.image}
            alt="Product"
          />
        </figure>

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

          <div className="">
            {/* Your book details rendering */}
            <button
              className="btn btn-outline w-1/2 flex justify-center items-center"
              onClick={handlecheckBorrwedBook}
              disabled={items.quantity === 0}
            >
              Borrowed
            </button>
          </div>
        </div>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Borrowed Book!</h3>
          <p className="py-4">How Much Time Need This Book</p>
          <div className="modal-action">
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              <div>
                <button
                  onClick={() => {
                    handleBorrowed();
                    handleBorrowedBook();
                  }}
                  className="btn btn-ghost"
                >
                  Borrowed
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DetailsBook;
