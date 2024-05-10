
import { Navigate } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            Error Page 
            <Navigate to='/'>Goto Home</Navigate>
        </div>
    );
};

export default ErrorPage;