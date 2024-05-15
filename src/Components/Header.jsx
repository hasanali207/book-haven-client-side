
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png'
const Header = () => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from local storage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {

    localStorage.setItem("theme", theme);

    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = (e) => {

    setTheme(e.target.checked ? "synthwave" : "light");
  };


  const { user, logOut } = useAuth();



  const handleLogout = () => {
    logOut()
  }
  const active = true
  const NavList = (
    <>
      <li className="bg-white">
        <NavLink className="text-lg"   to="/"  href="">
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
      <div className="navbar px-4 w-full lg:px-8  shadow-sm flex justify-between  items-center border-b-2 ">
      <div className="">
        <div className="dropdown z-50 ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {NavList}
          </ul>
        </div>
        <Link to="/" className="text-2xl text-slate-600 font-semibold">
          <img className='w-16' src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{NavList}</ul>
      </div>

      <div>
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            className="border-none"
            onChange={handleToggle}
          />

          {/* sun icon */}
          <svg
            className="swap-on text-white fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off  fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        <div className="dropdown dropdown-hover">
          <div
            title={user?.displayName}
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar relative"
          >
            <div className="w-10 rounded-full">
              {user && (
                <img tabIndex={0} alt="User" src={user?.photoURL} />
              ) }
            </div>
          </div>

          {user && (
            <ul
              tabIndex={0}
              className="dropdown-content  z-[10] menu p-2 shadow bg-base-100 rounded-box "
            >
              <li>
                <a>{user?.displayName}</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              <li>
                
              </li>
            </ul>
          )}
        </div>

        <div className="ml-3 flex flex-col lg:flex-row">
          {/* <Link onClick={handleSignOut}>
            <button>Logout</button>
          </Link> */}

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
        </div>
      </div>
    </div>
    </>

  )
}

export default Header;