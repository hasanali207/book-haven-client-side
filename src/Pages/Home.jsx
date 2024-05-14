import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import { Link } from "react-router-dom";
import pageOver from '../assets/pageover.jpg'
const Home = () => {
  const [items, setItems] = useState([]);

  // Fetch items from the backend API
  useEffect(() => {
    fetch(`http://localhost:5000/items`)
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {items.map((item) => (
          <div key={item._id}>
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <img src={item.image} alt="img here" />
              <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {item.category}
                </h3>
                <Link to={`/data/${item.category}`}>
                  <p className="mt-1 text-gray-500 dark:text-neutral-400">
                    {item.category}
                  </p>
                  <p className="mt-1 text-gray-500 dark:text-neutral-400">
                    {item.quantity}
                  </p>
                </Link>
                <a
                  className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  {item.name}
                </a>
              </div>
              <Link to={`/singleitem/${item._id}`}>
                <button className="btn btn-outline">Details</button>
              </Link>
              <Link to={`/items/update/${item._id}`}>
                {" "}
                <button className="btn btn-primary btn-outline">Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    
    <div className="text-center py-10">
        <h1 className="text-5xl font-semibold">Welcome to Book Haven Portal</h1>
        <p className="text-xl mt-3">There is nothing like getting lost in a good book!</p>
    </div>  
      
      <div className="container flex text-black flex-col mx-auto lg:flex-row">
 <div>
    <img src={pageOver} alt="" />
 </div>
  <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
   News
    <h2 className="text-5xl font-semibold leading-none">Coming Soon...
</h2>
    <p className="mt-4 mb-8 text-xl">We are honored to announce our next Page Overlay™ set… Bride by@alihazelwood🦇🐺🩸👰‍♀️🌑!</p>
    <p className="mt-4 mb-8 text-lg">
A dangerous alliance between a Vampyre bride and an Alpha Werewolf becomes a love deep enough to sink your teeth into. Enjoy six Page Overlays™ for this sweet and spicy paranormal romance! We are so delighted to share that the amazing @lilith_saur illustrated this set so that the artwork matches your book's cover!</p>
    
  </div>
</div>





    
    </div>
  );
};

export default Home;
