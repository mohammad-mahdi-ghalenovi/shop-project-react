import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Products from "./components/Products";
import Basket from "./components/Basket"
import PrivateRoute from "./components/PrivateRoute";

let routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/Login", element: <Login /> },
  {
    path: "/basket",
    element: (
      <PrivateRoute>
        <Basket />
      </PrivateRoute>
    ),
  },
];

export default routes;
 