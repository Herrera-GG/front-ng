import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useGetData from "../hooks/useGetData";
import CardProduct from "../components/CardProduct";

function Carrito() {
  const [productos, setProductos] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const { data, isPending } = useGetData("productos");

  useEffect(() => {
    const productos = localStorage.getItem("productos");
    if (!productos) {
      localStorage.setItem("productos", JSON.stringify([]));
      setProductos([]);
    } else {
      setProductos(JSON.parse(productos));
    }
  }, [actualizar]);

  return (
    <div className="p-5">
      {!isPending && (
        <Success
          data={data.response}
          producto={productos}
          setActualizar={setActualizar}
        />
      )}
    </div>
  );
}

const Success = ({ data, producto, setActualizar }) => {
  console.log(data);
  return (
    <>
      {producto.length > 0 &&
        producto.map((id, index) => (
          <CardProduct
            data={data.filter((producto) => producto.idproducto === id)[0]}
            isInCart
            indexElement={index}
            extra={setActualizar}
          />
        ))}
      {producto.length <= 0 && <p>Agrega productos a tu carrito.</p>}
    </>
  );
};

export default Carrito;
