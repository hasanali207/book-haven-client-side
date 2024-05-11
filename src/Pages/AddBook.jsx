
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

function AddBook() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async(data) => {
   axios.post(`${import.meta.evn.VITE_API_URL}/items/`, data)
   .then(() => {
    Swal.fire({
        title: "Book  Added?",
        text: "Book Data is Added this!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay!"
      })
  })
  .catch((error) => {
    console.error('Error inserting data:', error);
  });

  };

  return (
    <div>
        <div className='py-12 flex items-center justify-center'>
        <h2 className='text-3xl font-bold'>Add Book</h2>
        </div>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-3 gap-3'>
        <div>
          <label htmlFor="image">Image</label>
          <input type="text" id="image" {...register("image")} />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" {...register("quantity", { required: true, pattern: /^\d+$/ })} />
          {errors.quantity && errors.quantity.type === "required" && <span>This field is required</span>}
          {errors.quantity && errors.quantity.type === "pattern" && <span>Quantity must be a numeric value</span>}
        </div>
        <div>
          <label htmlFor="author">Author Name</label>
          <input type="text" id="author" {...register("author", { required: true })} />
          {errors.author && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input type="text" id="category" {...register("category", { required: true })} />
          {errors.category && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="description">Short Description</label>
          <textarea id="description" {...register("description", { required: true })} />
          {errors.description && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input type="number" id="rating" {...register("rating", { required: true, min: 1, max: 5 })} />
          {errors.rating && errors.rating.type === "required" && <span>This field is required</span>}
          <p>{errors.rating && (errors.rating.type === "min" || errors.rating.type === "max") && <span>Rating must be between 1 and 5</span>}</p>
        </div>
        </div>
        <div>
          
          <p>This section could contain static text about the book.</p>
        </div>
      <div>  <button type="submit">Add</button></div>
      </form>
    </div>
  );
}

export default AddBook;
