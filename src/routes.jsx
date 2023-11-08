import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Basket from "./components/Basket/Basket";
import PrivateRoute from "./components/PrivateRoute";
import ProductPage from "./components/ProductPage";
// CMS Routes
import CmsHome from "./CMS/CMS";
import CmsUsersList from "./CMS/pages/UsersList/UsersList";
import CmsNewUser from "./CMS/pages/NewUser/NewUser";
import CmsUser from "./CMS/pages/User/User";
import CmsProducts from "./CMS/pages/Products/Products";
import CmsProduct from "./CMS/pages/Product/Product";
import CmsNewProduct from "./CMS/pages/NewProduct/NewProduct";

let routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/Login", element: <Login /> },
  { path: "/product/:productID", element: <ProductPage /> },
  {
    path: "/basket",
    element: (
      <PrivateRoute>
        <Basket />
      </PrivateRoute>
    ),
  },
  {
    path: "/cms/*",
    element: <CmsHome />,
    children: [
      { path: "products", element: <CmsProducts /> },
      { path: "users", element: <CmsUsersList /> },
      { path: "newUser", element: <CmsNewUser /> },
      { path: "newProduct", element: <CmsNewProduct /> },
      { path: "products", element: <CmsProducts /> },
      { path: "product/:productID", element: <CmsProduct /> },
      { path: "user/:userID", element: <CmsUser /> },
    ],
  },
];

export default routes;
