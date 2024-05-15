import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

import Swal from "sweetalert2";

export default function BorrowedBooks() {
  const { user } = useAuth();

  
  const [items, setItems] = useState([]);



  useEffect(() => {
    fetch(`https://server-book-haven.vercel.app/getbrrowedbook/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [user?.email]);

  const handleReturn = (_id, setId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Return this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Returned it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://server-book-haven.vercel.app/return/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {

              const remaining = items.filter(item => item._id !== _id)
              setItems(remaining)
              fetch(`https://server-book-haven.vercel.app/getreturn/${setId}`, {
                method: "PUT",
              });
              Swal.fire({
                title: "Returned!",
                text: "Your Item has been deleted.",
                icon: "success",
              });
              
            }
          });
      }
    });
  };

 


  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {items.map((item) => (
          <div className="card w-96 bg-base-100 border mt-6">
            <figure >
              <img className="border-4 mt-3 border-slate-200" src={item.image} alt="Shoes"  />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>{item.category}</p>
              <div>
              <p className=""> Boorowed Date: {new Date(item.borrowedDate).toLocaleDateString()}</p>
              <p> Return Date: {new Date(item.return_date).toLocaleDateString()}</p>
               </div>
              <div className="card-actions mt-2">
                <button
                  onClick={() => handleReturn(item._id, item.setId) }
                  className="btn bg-slate-200 w-40 "
                >
                  Return
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
