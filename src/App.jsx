import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Property from "./pages/Property";
import Posts from "./pages/Posts";


import UserInfo from "./features/UserManager/components/UserInfo";
import UserDetail from "./features/UserManager/components/UserDetail";
import UserEdit from "./features/UserManager/components/UserEdit";
import UserAdd from "./features/UserManager/components/UserAdd";
import Register from "./features/AuthManager/components/Register/Register";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Register", element: <Register /> },
      { path: "/users", element: <Users />, children: [
        { path: "/users", element: <UserInfo /> },
        { path: "/users/add", element: <UserAdd />},
        { path: "/users:id", element: <UserDetail /> },
        { path: "/users:id/edit", element: <UserEdit /> },
      ] },
      { path: "posts", element: <Posts /> },
      { path: "/Property", element: <Property /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;