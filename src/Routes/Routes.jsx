import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DetailsBook from "../Components/DetailsBook";
import SingleCatData from "../Components/SingleCatData";
import AddBook from "../Pages/AddBook";
import AllBooks from "../Pages/AllBooks";
import BorrowedBooks from "../Pages/BorrowedBooks";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import UpdateList from "../Pages/UpdateList";
import PrivateRoute from "../Private/PrivateRoute";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
        path: "/",
        element: <Home></Home>,
        },
        {
        path: "/login",
        element: <Login></Login>,
        },
        {
        path: "/register",
        element: <Register></Register>,
        },
        {
        path: "/allbooks",
        element: <PrivateRoute><AllBooks></AllBooks></PrivateRoute>
        },
        {
        path: "/addbook",
        element: <PrivateRoute><AddBook></AddBook></PrivateRoute>,
        },
        {
          path:'/singleitem/:id',
          element: <PrivateRoute><DetailsBook></DetailsBook></PrivateRoute>,
          loader:({params}) => fetch(`https://server-book-haven.vercel.app/items/${params.id}`)
        },
        {
          path: "/data/:category",
          element: <SingleCatData></SingleCatData>,
          loader: ({params}) => fetch(`https://server-book-haven.vercel.app/data/${params.subcategory_name}`)
          },

        {
        path: "/borrowedbooks",
        element: <PrivateRoute><BorrowedBooks></BorrowedBooks></PrivateRoute>,
        }, 
        {
          path: '/items/update/:id',
          element: <PrivateRoute><UpdateList></UpdateList></PrivateRoute>,
                
        }
      ]
    },
  ]);
  export default router;