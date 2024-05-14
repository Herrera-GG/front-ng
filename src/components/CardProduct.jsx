import React from "react";

function CardProduct({ data, isInCart }) {
  const addToCart = (id) => {
    const productos = JSON.parse(localStorage.getItem("productos"));

    productos.push(id);

    localStorage.setItem("productos", JSON.stringify(productos));
  };
  return (
    <div className="w-full border rounded-lg shadow flex flex-col items-center p-5 gap-5">
      <img src={data.img} loading="lazy" className=" size-40 object-cover" />
      <div className="flex justify-around w-full">
        <b>${data.precioUnitario}</b>
        {!isInCart && (
          <button type="button" onClick={() => addToCart(data.idproducto)}>
            Añadir al carrito
          </button>
        )}
      </div>
    </div>
  );
}

export default CardProduct;
