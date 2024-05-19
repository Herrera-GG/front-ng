import React from "react";
import { Outlet } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faJar,
  faCheese,
  faPepperHot,
  faBowlFood,
  faBorderAll,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Layout() {
  const { data, isPending } = useGetData("categorias");
  const icons = [faPepperHot, faCheese, faJar, faBowlFood];
  const navigation = useNavigate();
  return (
    <div className="w-full h-full">
      <ToastContainer autoClose={800} closeOnClick />
      <header className="bg-gray-900 h-1/6 flex flex-col text-white">
        <div className="flex justify-between px-10 py-3">
          <img alt="logo" src="" height="200px" />
          <div className="absolute right-0 flex items-center">
            {!localStorage.getItem("admin") && (
              <>
                <NavLink to="carrito">
                  <Button className="rounded-full" size="sm">
                    <FontAwesomeIcon className="size-8" icon={faCartShopping} />
                  </Button>
                </NavLink>
                <NavLink to="login">
                  <Button className="rounded-full" size="sm">
                    <FontAwesomeIcon className="size-8" icon={faUser} />
                  </Button>
                </NavLink>
              </>
            )}
            {localStorage.getItem("admin") && (
              <>
                <NavLink to="pedidos">
                  <Button className="rounded-full" size="sm">
                    <FontAwesomeIcon className="size-8" icon={faUser} />
                  </Button>
                </NavLink>
                <Button
                  className="rounded-full"
                  onClick={() => {
                    localStorage.removeItem("admin");
                    navigation("/");
                  }}
                  size="sm"
                >
                  <FontAwesomeIcon
                    className="size-8 text-red-600"
                    icon={faRightFromBracket}
                  />
                </Button>
              </>
            )}
          </div>
        </div>
        <div className=" grow flex justify-evenly">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex flex-col justify-end items-center border-b-4 border-blue-600 transition-all ease-in-out duration-300"
                : "flex flex-col justify-end items-center"
            }
          >
            <Button size="sm">
              <div className=" text-center">
                <FontAwesomeIcon className="size-5" icon={faBorderAll} />
              </div>
              Todo
            </Button>
          </NavLink>
          {!isPending &&
            data.response.map((el, index) => (
              <NavLink
                to={`/categoria/${el.idcategoria}`}
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-col items-center justify-end border-b-4  border-blue-600 transition-all ease-in-out duration-300"
                    : "flex flex-col items-center justify-end "
                }
                key={el.idcategoria}
              >
                <Button size="sm">
                  <div className="text-center">
                    <FontAwesomeIcon className=" size-5" icon={icons[index]} />
                  </div>
                  {el.nombre}
                </Button>
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
