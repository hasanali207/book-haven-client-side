import React from "react";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
export default function SingleBook({ item }) {
  const { author, category, _id, image, name, quantity, rating } = item;
  return (
    <>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <img src={image} alt="img here" />
        <div className="">
          
          {/* <Link to={`/data/${category}`}>
            <p className="mt-1 text-gray-500 dark:text-neutral-400">
              {category}
            </p>
            
          </Link>
          */}
        <div className="p-2">
        <h2
            className="mb-2 text-xl font-semibold "
          >
            {name}
          </h2>
          <h3 className="text-sm font-bold text-blue-500 text-gray-800 dark:text-white">
            {category}
          </h3>
        </div>
         <div className="flex justify-between items-center border border-x-0 p-3 my-3">
          <div>
            <p>quantity: {quantity}</p>
          </div>
          <div className="flex items-center gap-3">
          <p>Rating:</p>
          <Rating
        initialRating={rating}
        readonly={true}
        emptySymbol={<FaRegStar></FaRegStar>}
        fullSymbol={<FaStar className='text-yellow-500'></FaStar>}
      />
          </div>
         </div>
        </div>
       <div className="flex gap-4">
      
        <Link to={`/items/update/${item._id}`}> <button className="btn m-2 btn-primary btn-outline">Update</button></Link>
       </div>
      </div>
    </>
  );
}
