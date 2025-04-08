import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../error-page";
import Contact from "../pages/contact";
import Search from "../components/Search";
import Login from "../pages/loginpage";
import Profile from "../pages/profilepage";
import Register from "../pages/registerpage.jsx";
import MakerPage from "../pages/makerpage";
import AdminLogin from "../pages/AdminLogin"; // Import the AdminLogin component
import AdminPanel from "../pages/AdminPanel"; // Import the AdminPanel component
import AdminRoute from "../routes/AdminRoute"; // Import the AdminRoute component

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
  { path: "/admin/login", element: <AdminLogin /> }, // Route for the admin login page
  {
    path: "/admin",
    element: <AdminRoute />, // Use the AdminRoute for protection
    children: [
      { index: true, element: <AdminPanel /> }, // The main admin panel page
      // Add other admin-related routes as children here, e.g.,
      // { path: "users", element: <AdminUsers /> },
      // { path: "recipes", element: <AdminRecipes /> },
      // { path: "categories", element: <AdminCategories /> },
    ],
  },
]);

export default AppRoutes;