import React from "react";
import { toast } from "react-toastify";

function CardProduct({ data, isInCart, indexElement, extra }) {
  const addToCart = (id) => {
    const productos = JSON.parse(localStorage.getItem("productos"));

    productos.push(id);

    localStorage.setItem("productos", JSON.stringify(productos));
    toast.success("Añadido al carrito.");
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
  return (
    <>
      <div
        className={`w-full border rounded-lg shadow flex ${
          isInCart ? "flex-row" : "flex-col"
        } items-center p-5 gap-5 mb-5`}
      >
        <img src={data.img} loading="lazy" className=" size-40 object-cover" />
        <div className="flex justify-around w-full">
          {isInCart && (
            <div className="flex flex-col gap-5 items-center">
              <p className="w-28 text-center">{data.nombre}</p>
              <b>${data.precioUnitario}</b>
            </div>
          )}
          {!isInCart && <b>${data.precioUnitario}</b>}

          {!isInCart && (
            <button type="button" onClick={() => addToCart(data.idproducto)}>
              Añadir al carrito
            </button>
          )}
          {isInCart && (
            <button
              type="button"
              onClick={() => {
                removeFromCart();
                extra((prev) => !prev);
              }}
            >
              Eliminar del carrito
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default CardProduct;
