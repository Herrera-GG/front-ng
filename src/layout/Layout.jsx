import React from "react";
import { Outlet } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/icon.png";
import {
  faCartShopping,
  faJar,
  faCheese,
  faPepperHot,
  faBowlFood,
  faBorderAll,
  faUser,
  faRightFromBracket,
  faClipboardList,
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
        <div className="flex justify-center px-10 py-3 grow relative">
          <NavLink to="/">
            <img
              alt="icono"
              src={logo}
              className=" size-14 object-contain absolute left-2"
            />
          </NavLink>
          <i className=" text-sm absolute bottom-0">
            Servicio solo para el TECNM campus de los Ríos.
          </i>
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
                    <FontAwesomeIcon
                      className="size-8"
                      icon={faClipboardList}
                    />
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
        <div className="justify-evenly flex">
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

      <div className="w-full h-5/6 overflow-y-auto flex flex-col">
        <Outlet />
        <div className="grow flex flex-col justify-end items-center p-5 text-gray-600 ">
          <i>Quejas y sugerencias: </i>
          <p>961 666 1317</p>
          <span className="w-full text-end">Versión 0.0.5</span>
        </div>
      </div>
    </div>
  );
}

export default Layout;
