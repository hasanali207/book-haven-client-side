
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';

function AddBook() {
  const {user} = useAuth()
  console.log(user)
  const { control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      librian_email: user?.email,
      libraian_name: user?.displayName
    },
  });
  const categories = ['Novel', 'Thriller', 'History', 'Drama', 'Sci-Fi'];
  

  const onSubmit = async(data) => {

    data.quantity = parseInt(data.quantity);
    
   axios.post(`https://server-book-haven.vercel.app/items`, data)
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
      <Controller
        name="category"
        className="p-2"
        control={control}
        defaultValue="History"
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

        <div>
          <label htmlFor="librian_email">Email</label>
          <input type="text" id="image" {...register("librian_email")} disabled  />

        </div>
        <div>
          <label htmlFor="librian_email">libraian_name</label>
          <input type="text" id="image" {...register("libraian_name")} disabled  />

        </div>
        </div>
        <div>
          
          <p>This section could contain static text about the book.</p>
        </div>
        
      <div>  <button className='btn btn-outline w-40 mt-4' type="submit">Add</button></div>
      </form>
    </div>
  );
}

export default AddBook;
