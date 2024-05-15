import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "../Components/Slider";

import Rating from "react-rating";
import HomeBestBook from "../Components/HomeBestBook";
import pageOver2 from "../assets/1001.jpg";
import pageOver from "../assets/pageover.jpg";
const Home = () => {
  const [items, setItems] = useState([]);

  // Fetch items from the backend API
  useEffect(() => {
    fetch(`https://server-book-haven.vercel.app/items`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <div>
      <div>
        <Slider></Slider>
      </div>

      <div className="">
        <h1 className="text-4xl font-semibold mt-10">View by Category</h1>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {items.slice(0,6).map((item) => (
          <div key={item._id}>
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <img src={item.image} alt="img here" />
              <div className="">
                <div className="p-2 space-y-2">
                  <h1>{item.name}</h1>
                  <h1> Author: {item.author}</h1>
                </div>
                <div className="flex  justify-between items-center border border-x-0 p-2">
                  <Link to={`/data/${item.category}`}>
                    <p className=" text-xl text-gray-500 dark:text-neutral-400">
                      Category: {item.category}
                    </p>
                  </Link>

                  <div className="flex items-center gap-3">
                    <p>Rating:</p>
                    <Rating
                      initialRating={item.rating}
                      readonly={true}
                      emptySymbol={<FaRegStar></FaRegStar>}
                      fullSymbol={<FaStar className="text-yellow-500"></FaStar>}
                    />
                  </div>
                </div>
              </div>
              <Link to={`/singleitem/${item._id}`}>
                <button className="btn btn-outline my-4 ml-3">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-10">
        <h1 className="text-5xl font-semibold">Welcome to Book Haven Portal</h1>
        <p className="text-xl mt-3">
          There is nothing like getting lost in a good book!
        </p>
      </div>

      <div className="container  flex text-black flex-col mx-auto lg:flex-row">
        <div>
          <img src={pageOver} alt="" />
        </div>
        <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
          News
          <h2 className="text-5xl font-semibold leading-none">
            Coming Soon...
          </h2>
          <p className="mt-4 mb-8 text-xl">
            We are honored to announce our next Page Overlay™ set… Bride
            by@alihazelwood🦇🐺🩸👰‍♀️🌑!
          </p>
          <p className="mt-4 mb-8 text-lg">
            A dangerous alliance between a Vampyre bride and an Alpha Werewolf
            becomes a love deep enough to sink your teeth into. Enjoy six Page
            Overlays™ for this sweet and spicy paranormal romance! We are so
            delighted to share that the amazing @lilith_saur illustrated this
            set so that the artwork matches your book's cover!
          </p>
        </div>
      </div>
      <div className="container mt-20 flex flex-col lg:flex-row-reverse text-black   mx-auto">
        <div className=" w-fu lg:w-[60%]">
          <img className=" w-full h-[450px]" src={pageOver2} alt="" />
        </div>
        <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
          News
          <h2 className="text-5xl font-semibold leading-none">
            Coming Soon...
          </h2>
          <p className="mt-4 mb-8 text-xl">Page Overlays™</p>
          <p className="mt-4 mb-8 text-lg">
            {" "}
            Turn your book into a special edition and bring scenes to life while
            you read with our beautiful illustrated Page Overlays™. Slip the
            artwork printed on semi-translucent paper into the copy of your
            book, showcasing the specific scene before your eyes.
          </p>
        </div>
      </div>

      <HomeBestBook></HomeBestBook>
    </div>
  );
};

export default Home;
