import React from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Categorias from "../pages/Categorias";
import Home from "../pages/Home";
import Carrito from "../pages/Carrito";
import Axios from "../Axios";
import Mantenimiento from "../pages/Mantenimiento";
import { redirect } from "react-router-dom";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: async () => {
        try {
          await Axios.get("productos");
          return null;
        } catch (err) {
          return redirect("/mantenimiento");
        }
      },
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "categoria/:idcategoria", element: <Categorias /> },
        { path: "carrito", element: <Carrito /> },
      ],
    },
    {
      path: "/mantenimiento",
      element: <Mantenimiento />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Routes;
