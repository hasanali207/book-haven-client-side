import React from 'react';

export default function SingleBorrowBook({ item, handleReturn }) {
  const { _id, author, return_date, category, quantity, image, name, rating } = item;

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p>{category}</p>
          <p>{quantity}</p>
          <p>{return_date}</p>
          <div className="card-actions">
            <button onClick={() => handleReturn(_id)} className="btn btn-primary">Return</button>
          </div>
        </div>
      </div>
    </>
  );
}
