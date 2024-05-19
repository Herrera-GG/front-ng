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
import Login from "../pages/Login";
import Pedidos from "../pages/Pedidos";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: async () => {
        try {
          await Axios.get("status");
          return null;
        } catch (err) {
          return redirect("/mantenimiento");
        }
      },
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: async () => {
            try {
              await Axios.get("status");
              return null;
            } catch (err) {
              return redirect("/mantenimiento");
            }
          },
        },
        { path: "categoria/:idcategoria", element: <Categorias /> },
        { path: "carrito", element: <Carrito /> },
        {
          path: "login",
          loader: () => {
            if (!localStorage.getItem("admin")) {
              return null;
            }
            return redirect("/pedidos");
          },
          element: <Login />,
        },
        { path: "pedidos", element: <Pedidos /> },
      ],
    },
    {
      path: "/mantenimiento",
      loader: async () => {
        try {
          await Axios.get("status");
          return redirect("/");
        } catch (err) {
          return null;
        }
      },
      element: <Mantenimiento />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Routes;
