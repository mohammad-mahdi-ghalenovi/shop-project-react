import Home from "./pages/Home/Home";
import UsersList from "./pages/UsersList/UsersList";
import NewUser from "./pages/NewUser/NewUser";
import User from "./pages/User/User";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import NotFound from "./pages/NotFound/NotFound";

let routes = [
  { path: "/", element: <Home /> },
  { path: "/users", element: <UsersList /> },
  { path: "/newUser", element: <NewUser /> },
  { path: "/products", element: <Products /> },
  { path: "/product/:productID", element: <Product /> },
  { path: "/user/:userID", element: <User /> },
  { path: "/*", element: <NotFound /> },
];

export default routes;
