import React from 'react';
import Rating from 'react-rating';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const NumericalRating = ({ value }) => {
  return (
    <div>
      
      <Rating
        initialRating={value}
        readonly={true}
        emptySymbol={<FaRegStar></FaRegStar>}
        fullSymbol={<FaStar className='text-yellow-500'></FaStar>}
      />
    </div>
  );
}

export default NumericalRating;
