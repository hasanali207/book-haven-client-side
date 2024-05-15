import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Rating from "react-rating";

export default function SingleCatData() {
  const { category } = useParams();
  const [items, setItems] = useState([]);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `https://server-book-haven.vercel.app/data/${category}`
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, [category]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-10">
      {items &&
        items.map((item) => (
          <div
            key={item._id}
            className="card text-[#150B2B] shadow-xl border-2 border-slate-100"
          >
            <figure>
              <img
                className="w-full hover:scale-105 duration-300 ease-in-out"
                src={item.image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body bg-slate-200">
              <h2 className="card-title">{item.name}</h2>
              <div className="">
                <p>Category By: {item.category}</p>
              </div>
              <p>{item.description}</p>
              <p>Author By: {item.author}</p>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                 <p> Rating: </p>
                  <Rating
                    initialRating={item.rating}
                    readonly={true}
                    emptySymbol={<FaRegStar></FaRegStar>}
                    fullSymbol={<FaStar className="text-yellow-500"></FaStar>}
                  />
                </div>
                <p>{item.quantity}</p>
              </div>
            </div>
            <Link to={`/singleitem/${item._id}`}>
              <button className="rounded-b-2xl bg-purple-600 py-3 text-white w-full">
                View Details
              </button>
            </Link>
          </div>
        ))}
    </div>
  );
}
