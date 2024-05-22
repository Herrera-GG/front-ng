import React from "react";
import useGetData from "../hooks/useGetData";
import CardProduct from "../components/CardProduct";
import { Spinner } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const { data, isPending } = useGetData("productos");
  return (
    <div className=" p-10 flex flex-col flex-wrap gap-5 justify-center">
      <div className="flex justify-evenly border p-2 rounded-lg items-center w-full text-gray-600">
        <div className="p-2 rounded-full bg-blue-600 size-8 flex justify-center items-center text-white">
          <FontAwesomeIcon className="size-5" icon={faTag} />
        </div>
        Envio gratis a partir de 5 productos.
      </div>
      {!isPending &&
        data.response.map((el) => (
          <CardProduct data={el} key={el.idproducto} />
        ))}
      {isPending && <Spinner className=" size-40 mx-auto" />}
    </div>
  );
}

export default Home;
