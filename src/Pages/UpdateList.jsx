import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from "../Hooks/useAuth";

export default function UpdateList() {
  const { id } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState({});
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    fetch(`https://server-book-haven.vercel.app/items/update/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // data.quantity = parseInt(data.quantity);
        setItem(data);
        setValue('librian_email', user?.email || '');
        setValue('image', data.image || '');
        setValue('name', data.name || '');
        // setValue('quantity', data.quantity || '');
        setValue('author', data.author || '');
        setValue('category', data.category || '');
        setValue('description', data.description || '');
        setValue('rating', data.rating || '');
      });
  }, [id, user?.email, setValue]);

  
  const categories = ['Novel', 'Thriller', 'History', 'Drama', 'Sci-Fi'];

 

  const onSubmit = async (data) => {
    try {
      await fetch(`https://server-book-haven.vercel.app/updateItem/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      Swal.fire({
        title: 'Update',
        text: "You won't be able to Updated this!",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sure!'
      });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
        <div className='py-12 flex items-center justify-center'>
        <h2 className='text-3xl font-bold'>Update Book</h2>
        </div>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-3 gap-3'>
        <div>
          <label htmlFor="image">Image</label>
          <input type="text" id="image"  {...register("image", { required: true })} />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>
           <div>
          <label htmlFor="author">Author Name</label>
          <input type="text" id="author" {...register("author", { required: true })} />
          {errors.author && <span>This field is required</span>}
        </div>
      
        <div>
      <label htmlFor="category">Category</label>
      <Controller
        name="category"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <select id="category" {...field}>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}
      />
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
          
         
        </div>
        
      <div className='flex justify-center items-center mt-4'>  <button className="btn btn-outline w-28" type="submit">Update</button></div>
      </form>
    </div>
  )
}
