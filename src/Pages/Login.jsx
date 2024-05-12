import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
    const { signInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Navigation systems
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.pathname || "/";

    
    // Handle login
    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            const result = await signInUser(email, password);
            
            if (result) {
                const loggedUser = result.email;
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser, { withCredentials: true });
                

                if (res.data.token) {
                    navigate(from);
                    toast.success('Login Successfully');
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Email & Password Don\'t Match');
        }
    };

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="email"
                                    className="input input-bordered"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password" // Change type from "text" to "password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className="form-control mt-6 p-0">
                                <button className="btn btn-neutral">Login</button>
                            </div>
                            <label className="label">
                                New here? <Link to="/register" className="label-text-alt link link-hover">Create an account</Link>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
