import React from "react";
import useGetData from "../hooks/useGetData";
import { Spinner } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../Axios";
import { toast } from "react-toastify";
import CardPedidos from "../components/CardPedidos";

function Pedidos() {
  const [actualizar, setActualizar] = useState(false);

  const { data, isPending } = useGetData("carritos", actualizar);
  console.log(data);

  const marcarEntregado = async (idCarrito) => {
    const { idusuario } = JSON.parse(localStorage.getItem("admin"));

    try {
      await Axios.put(`carritos/autorizar/${idCarrito}`, { idUser: idusuario });
      toast.success("Marcado como enviado.");
      setActualizar((prev) => !prev);
    } catch (error) {
      toast.error("Error al marcar como enviado");
    }
  };
  const cancelarCart = async (idCarrito) => {
    try {
      await Axios.put(`carritos/cancelar/${idCarrito}`);
      toast.success("Orden cancelada.");
      setActualizar((prev) => !prev);
    } catch (error) {
      toast.error("Error al cancelar orden.");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-10 justify-center items-center">
      {!isPending && (
        <>
          {data.response.map((el) => (
            <CardPedidos
              el={el}
              isInCart={false}
              marcarEntregado={marcarEntregado}
              cancelarCart={cancelarCart}
            />
          ))}
        </>
      )}
      {isPending && <Spinner className="size-40" />}
    </div>
  );
}

export default Pedidos;
