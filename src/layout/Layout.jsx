import React from "react";
import { Outlet } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Layout() {
  const { data, isPending } = useGetData("categorias");
  return (
    <div className="w-full h-full">
      <ToastContainer autoClose={800} closeOnClick />
      <header className="bg-slate-900 h-1/6 flex flex-col text-white">
        <div className="flex">
          <img alt="logo" src="" height="200px" />
          <NavLink to="carrito">Carrito</NavLink>
        </div>
        <div className=" grow flex justify-evenly items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-2  border-blue-600 transition-all ease-in-out duration-300"
                : ""
            }
          >
            Todos los productos
          </NavLink>
          {!isPending &&
            data.response.map((el) => (
              <NavLink
                to={`/categoria/${el.idcategoria}`}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2  border-blue-600 transition-all ease-in-out duration-300"
                    : ""
                }
                key={el.idcategoria}
              >
                {el.nombre}
              </NavLink>
            ))}
        </div>
      </header>
      <div className="w-full h-5/6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
