import React from "react";
import useGetData from "../hooks/useGetData";
import CardProduct from "../components/CardProduct";
import { Spinner } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const { data, isPending } = useGetData("productos");
  const masVendido =
    !isPending &&
    data.response.sort((a, b) => a.existencias - b.existencias)[0];
  console.log(masVendido);
  return (
    <div className=" p-10 flex flex-col flex-wrap gap-5 justify-center relative">
      <div className="flex justify-evenly p-2 rounded-lg items-center w-full text-gray-600">
        <div className="p-2 rounded-full bg-blue-600 size-8 flex justify-center items-center text-white">
          <FontAwesomeIcon className="size-5" icon={faTag} shake />
        </div>
        Envio gratis a partir de 5 productos.
      </div>
      <div className="flex justify-evenly p-2 rounded-lg items-center w-full text-gray-600 sticky top-0 bg-white/50 backdrop-blur-sm">
        <div className="p-2 rounded-full bg-red-600 size-8 flex justify-center items-center text-white">
          <FontAwesomeIcon className="size-5" icon={faFireFlameCurved} shake />
        </div>
        Más vendido:
        <img src={masVendido.img} className="size-10" alt="Más vendido" />
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
