import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "tachyons";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/sign-in/SignIn.js";
import Backgroundd from "./components/particlesjs/ParticlesBg";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    children: [
      {
        path: "/BG",
        element: <Backgroundd />,
      },
    ],
  },
  {
    path: "/home",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
