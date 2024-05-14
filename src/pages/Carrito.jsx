import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useGetData from "../hooks/useGetData";
import CardProduct from "../components/CardProduct";

function Carrito() {
  const [productos, setProductos] = useState([]);
  const { data, isPending } = useGetData("productos");
  console.log(data, productos);

  useEffect(() => {
    const productos = localStorage.getItem("productos");
    if (!productos) {
      localStorage.setItem("productos", JSON.stringify([]));
      setProductos([]);
    } else {
      setProductos(JSON.parse(productos));
    }

    console.log(productos);
  }, []);

  return (
    <div>
      {!isPending && <Success data={data.response} producto={productos} />}
    </div>
  );
}

const Success = ({ data, producto }) => {
  console.log(data);
  return (
    <div>
      {producto.map((id) => {
        console.log(
          data.filter((producto) => producto.idproducto === id),
          id
        );
        return (
          <CardProduct
            data={data.filter((producto) => producto.idproducto === id)[0]}
            isInCart
          />
        );
      })}
    </div>
  );
};

export default Carrito;
