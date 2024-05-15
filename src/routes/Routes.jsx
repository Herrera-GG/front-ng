import React from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Categorias from "../pages/Categorias";
import Home from "../pages/Home";
import Carrito from "../pages/Carrito";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "categoria/:idcategoria", element: <Categorias /> },
        { path: "carrito", element: <Carrito /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Routes;
