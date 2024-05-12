
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()

        
    if (loading) {
       
        return (
            <div className='flex justify-center items-center h-[100vh]'>
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to='/login' />;
    }

    return <div>{children}</div>;
};

export default PrivateRoute;
