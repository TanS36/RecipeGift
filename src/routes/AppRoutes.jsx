import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../error-page";
import Contact from "../pages/contact";
import Search from "../components/Search";
import Login from "../pages/loginpage";
import Profile from "../pages/profilepage";
import Register from "../pages/registerpage.jsx";
import MakerPage from "../pages/makerpage";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    errorElement: <ErrorPage />,
    children: [
      { path: "contacts/:contactId", element: <Contact /> },
      { path: "search", element: <Search /> }, 
    ],
  },
  { path: "/login", element: <Login /> }, 
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> }, 
  { path: "/maker", element: <MakerPage /> },
]);

export default AppRoutes;