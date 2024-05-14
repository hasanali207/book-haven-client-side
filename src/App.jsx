import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';



import Header from './Components/Header';
import Footer from './Components/Footer';
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
        <div className='max-w-7xl mx-auto p-4 md:p-6 lg:p-0 '>
        <Outlet></Outlet>
        </div>
        <div className='bg-slate-200 mt-20'>
        <Footer></Footer>
        </div>
        </div>
    );
};

export default App;