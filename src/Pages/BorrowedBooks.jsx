import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

import Swal from "sweetalert2";

export default function BorrowedBooks() {
  const { user } = useAuth();

  
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/getbrrowedbook/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [user?.email]);

  const handleReturn = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/return/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {

              const remaining = items.filter(item => item._id !== _id)
              setItems(remaining)
              fetch(`http://localhost:5000/getreturn/${_id}`, {
                method: "PUT",
              });
              Swal.fire({
                title: "Deleted!",
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
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={item.image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{item.name}</h2>
              <p>{item.category}</p>
              <p>{item.quantity}</p>
              <p>{item.return_date}</p>
              <div className="card-actions">
                <button
                  onClick={() => handleReturn(item._id) }
                  className="btn btn-primary"
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
