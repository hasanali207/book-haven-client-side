import React from "react";
import { Link } from "react-router-dom";

export default function SingleBook({ item }) {
  const { author, category, _id, image, name, quantity, rating } = item;
  return (
    <>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <img src={image} alt="img here" />
        <div className="p-4 md:p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {category}
          </h3>
          <Link to={`/data/${category}`}>
            <p className="mt-1 text-gray-500 dark:text-neutral-400">
              {category}
            </p>
            <p className="mt-1 text-gray-500 dark:text-neutral-400">
              {quantity}
            </p>
          </Link>
          <a
            className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            href="#"
          >
            {name}
          </a>
        </div>
        <Link to={`/singleitem/${_id}`}>
          <button className="btn btn-outline">Details</button>
        </Link>
        <Link to={`/items/update/${item._id}`}> <button className="btn btn-primary btn-outline">Edit</button></Link>
      </div>
    </>
  );
}
