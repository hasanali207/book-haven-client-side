import React from 'react';
import { useLoaderData } from 'react-router-dom';

const DetailsBook = () => {
    const items = useLoaderData();

    if (!items) {
        return <div>Loading...</div>; // You might want to add a loading state here
    }

    const { author,  category, _id,  image, name, quantity, rating } = items;

    return (
        <div className="max-w-md mx-auto my-10 bg-white shadow-md rounded-md overflow-hidden">
            <img className="w-full h-64 object-cover" src={image} alt="Product" />
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-600">Subcategory: {category}</p>
                <p className="text-gray-700 mt-2">{author}</p>
                <p className="text-gray-800 font-semibold mt-2">Rating: {rating}</p>
                <p className="text-gray-800 font-semibold mt-2">Quantity: {quantity}</p>
            </div>
        </div>
    );
};

export default DetailsBook;
