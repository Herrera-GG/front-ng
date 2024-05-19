import React from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import agruparArr from "../utils/agrupar";
import { Button } from "@material-tailwind/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

function CardProduct({ data, isInCart, indexElement, extra, cantidad }) {
  const addToCart = (element) => {
    const productos = JSON.parse(localStorage.getItem("productos"));
    const productosFlat = productos.flat(2); //elimina las agrupaciones
    productosFlat.push(element);

    localStorage.setItem(
      "productos",
      JSON.stringify(agruparArr(productosFlat, (el) => el.idproducto).values())
    );
    toast.success("Añadido al carrito");
  };
  const removeFromCart = () => {
    const productos = JSON.parse(localStorage.getItem("productos"));
    const beforeIndex = productos.slice(0, indexElement);
    const afterIndex = productos.slice(indexElement + 1, productos.length);
    localStorage.setItem(
      "productos",
      JSON.stringify([...beforeIndex, ...afterIndex])
    );
    toast.success("Eliminado del carrito.");
  };

  const removeOneFromCart = () => {
    const productos = JSON.parse(localStorage.getItem("productos"));

    if (productos[indexElement].length > 1) {
      productos[indexElement].pop();

      localStorage.setItem("productos", JSON.stringify(productos));
      toast.success("Eliminado del carrito.");
    }
  };

  const addOneToCart = () => {
    const productos = JSON.parse(localStorage.getItem("productos"));
    if (productos[indexElement].length <= 24) {
      productos[indexElement].push(productos[indexElement][0]);
      localStorage.setItem("productos", JSON.stringify(productos));
      toast.success("Añadido al carrito.");
    }

    console.log(productos);
  };
  return (
    <>
      <div
        className={`w-full border rounded-lg shadow flex ${
          isInCart ? "flex-row" : "flex-col"
        } items-center p-5 gap-5 mb-5`}
      >
        <img
          src={data.img}
          loading="lazy"
          className={`${isInCart ? " size-20" : "size-40"} object-cover`}
        />
        <div className="flex justify-around items-center w-full">
          {isInCart && (
            <div className="flex flex-col gap-5 items-center">
              <p className="text-center">{data.nombre}</p>
              <div className="flex gap-5 items-center">
                <Button
                  variant="text"
                  color="blue-gray"
                  onClick={() => {
                    removeOneFromCart();
                    extra((prev) => !prev);
                  }}
                >
                  <FontAwesomeIcon className=" size-3" icon={faMinus} />
                </Button>
                <div className=" w-5 text-center">{cantidad}</div>
                <Button
                  variant="text"
                  color="blue-gray"
                  onClick={() => {
                    addOneToCart();
                    extra((prev) => !prev);
                  }}
                >
                  <FontAwesomeIcon className=" size-3" icon={faPlus} />
                </Button>
              </div>
              <b>${data.precioUnitario} c/u</b>
            </div>
          )}
          {!isInCart && (
            <div className="flex flex-col w-full">
              <strong
                className={`${
                  data.existencias > 0 ? "text-green-600" : "text-red-600"
                } text-center text-xs`}
              >
                {data.existencias} disponibles
              </strong>
              {data.existencias > 0 && (
                <div className="flex w-full justify-evenly items-center">
                  <b>${data.precioUnitario} c/u</b>

                  <Button
                    variant="text"
                    color="blue"
                    type="button"
                    onClick={() => addToCart(data)}
                    className="flex items-center"
                  >
                    <FontAwesomeIcon
                      className=" size-6"
                      icon={faCartShopping}
                    />
                    Añadir al carrito
                  </Button>
                </div>
              )}
            </div>
          )}
          {isInCart && (
            <Button
              type="button"
              color="red"
              variant="text"
              className="flex items-center justify-center"
              onClick={() => {
                removeFromCart();
                extra((prev) => !prev);
              }}
            >
              <FontAwesomeIcon className="size-5" icon={faTrash} />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default CardProduct;
