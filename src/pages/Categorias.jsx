import React from "react";
import { useParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import CardProduct from "../components/CardProduct";
import { Spinner } from "@material-tailwind/react";

function Categorias() {
  const { idcategoria } = useParams();

  const { data, isPending } = useGetData(`categorias/obtener/${idcategoria}`);
  console.log(data);
  return (
    <div className=" p-10 flex flex-wrap gap-5 justify-center">
      {!isPending && data.response[0].productos.length <= 0 && (
        <div>No hay productos</div>
      )}
      {!isPending &&
        data.response[0].productos.length > 0 &&
        data.response[0].productos.map((el) => (
          <CardProduct data={el} key={el.idproducto} />
        ))}
      {isPending && <Spinner className="size-40" />}
    </div>
  );
}

export default Categorias;
