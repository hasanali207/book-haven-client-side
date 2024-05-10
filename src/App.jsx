import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';



import Header from './Components/Header';
const App = () => {
    const location = useLocation();
        
    useEffect(()=>{
        if(location.pathname === '/'){
            document.title = `Book Haven`
        }else{ document.title = `${location.pathname.replace('/', '')}`}
       if(location.state){
        document.title = location.state;
       }
    }, [location.pathname])

    return (
        <div>
        <Header ></Header>
        <div className='max-w-6xl mx-auto p-4 md:p-6 lg:p-0 '>
        <Outlet></Outlet>
        </div>
        
        </div>
    );
};

export default App;