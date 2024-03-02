import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Property from "./pages/Property";
import Posts from "./pages/Posts";
import LoginPage from "./pages/Login";
import Signout from "./pages/Logout";


//Login
import Register from "./features/AuthManager/components/Register/Register";


//UserManager components
import UserInfo from "./features/UserManager/components/UserInfo";
import UserDetail from "./features/UserManager/components/UserDetail";
import UserEdit from "./features/UserManager/components/UserEdit";
import UserAdd from "./features/UserManager/components/UserAdd";

//PropertyManager components
import PropertyInfo from "./features/PropertyManager/components/PropertyInfo";
import PropertyDetail from "./features/PropertyManager/components/PropertyDetail";
import PropertyEdit from "./features/PropertyManager/components/PropertyEdit";
import PropertyAdd from "./features/PropertyManager/components/PropertyAdd";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/Home", element: <Home />},
      { path: "/Register", element: <Register /> },
      { path: "/Posts", element: <Posts />},
      { path: "/Logout", element: <Signout /> },
      { path: "/users", element: <Users />, children: [
        { path: "/users", element: <UserInfo /> },
        { path: "/users/add", element: <UserAdd />},
        { path: "/users:id", element: <UserDetail /> },
        { path: "/users:id/edit", element: <UserEdit /> },
      ] },
       { path: "/property", element: <Property />, 
       children: [
        { path: "/property", element: <PropertyInfo/> },
        { path: "/property/add", element: <PropertyAdd />},
        { path: "/property:id", element: <PropertyDetail /> },
        { path: "/property:id/edit", element: <PropertyEdit /> },
      
     
      ] },
    ],
  
  },
]);    

    function App() {
  return <RouterProvider router={router} />;
}

export default App;