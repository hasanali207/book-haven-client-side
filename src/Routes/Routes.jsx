import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import AddBook from "../Pages/AddBook";
import BorrowedBooks from "../Pages/BorrowedBooks";
import AllBooks from "../Pages/AllBooks";
import Register from "../Pages/Register";
import PrivateRoute from "../Private/PrivateRoute";
import DetailsBook from "../Components/DetailsBook";


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
        element: <AllBooks></AllBooks>
        },
        {
        path: "/addbook",
        element: <PrivateRoute><AddBook></AddBook></PrivateRoute>,
        },
        {
          path:'singleitem/:id',
          element: <DetailsBook></DetailsBook>,
          loader:({params}) => fetch(`${import.meta.env.VITE_API_URL}/items/${params.id}`)
        },

        {
        path: "/borrowedbooks",
        element: <PrivateRoute><BorrowedBooks></BorrowedBooks></PrivateRoute>,
        }
      ]
    },
  ]);
  export default router;