import React from "react";
import { useParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import CardProduct from "../components/CardProduct";
import { Spinner } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

function Categorias() {
  const { idcategoria } = useParams();

  const { data, isPending } = useGetData(`categorias/obtener/${idcategoria}`);

  return (
    <div className=" p-10 flex flex-wrap flex-col gap-5 justify-center">
      <div className="flex justify-evenly border p-2 rounded-lg items-center w-full text-gray-600">
        <div className="p-2 rounded-full bg-blue-600 size-8 flex justify-center items-center text-white">
          <FontAwesomeIcon className="size-5" icon={faTag} shake />
        </div>
        Envio gratis a partir de 5 productos.
      </div>
      {!isPending && data.response[0].productos.length <= 0 && (
        <div>No hay productos</div>
      )}
      {!isPending &&
        data.response[0].productos.length > 0 &&
        data.response[0].productos.map((el) => (
          <CardProduct data={el} key={el.idproducto} />
        ))}
      {isPending && <Spinner className="size-40 mx-auto" />}
    </div>
  );
}

export default Categorias;
