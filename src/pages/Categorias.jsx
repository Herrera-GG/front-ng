import React from "react";
import { useParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import CardProduct from "../components/CardProduct";

function Categorias() {
  const { idcategoria } = useParams();

  const { data, isPending } = useGetData(`categorias/obtener/${idcategoria}`);
  console.log(data);
  return (
    <div className=" p-5">
      {!isPending && data.response[0].productos.length <= 0 && (
        <div>No hay productos</div>
      )}
      {!isPending &&
        data.response[0].productos.length > 0 &&
        data.response[0].productos.map((el) => (
          <CardProduct data={el} key={el.idproducto} />
        ))}
    </div>
  );
}

export default Categorias;
