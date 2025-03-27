//main.jsx
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css';
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={AppRoutes} />
  </React.StrictMode>
);
