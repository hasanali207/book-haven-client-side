
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Header = () => {
const {user, logOut} = useAuth();



const handleLogout =() =>{
  logOut()
}
    const NavList = (
        <>
          <li className="bg-white">
            <NavLink to="/" className="text-lg" href="">
              Home
            </NavLink>
          </li>
          <li className="bg-white">
            <NavLink to="/addbook" className="text-lg" href="">
              Add Book
            </NavLink>
          </li>
          <li className="bg-white">
            <NavLink to="/allbooks" className="text-lg" href="">
              All Book
            </NavLink>
          </li>
          <li className="bg-white">
            <NavLink to="/borrowedbooks" className="text-lg" href="">
              Borrowed Books
            </NavLink>
          </li>
         
         
          
        </>
    )

    return ( 
        <>
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {NavList}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Book Haven</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {NavList}
    </ul>
  </div>
  <div className="navbar-end">
  {
          !user && (
          <>
            <Link to="/login">
            <button>Login</button>
          </Link>
          <span className="hidden lg:inline-block mx-2"> / </span>
          <Link to="/register">
            <button>Sign up</button>
          </Link></> 
          )
         }

         {
          user && ( 
            <>
            <img className='w-12 rounded-full h-12 ' src={user?.photoURL} alt="None" />
            <button onClick={handleLogout}>Logout</button>
            </>
          )
         }
  </div>
     
     
    

</div>
    </> 
    
)
}

export default Header;