import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import ErrorPage from './error-page.jsx';
import Contact from "./pages/contact.jsx";
import Search from './components/Search';
import Login from "./pages/loginpage.jsx";
import Profile from "./pages/profilepage.jsx";
import Register from "./pages/reqisterpage.jsx"
import MakerPage from "./pages/makerpage.jsx";

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

