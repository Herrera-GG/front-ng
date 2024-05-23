import React from "react";
import useGetData from "../hooks/useGetData";
import { Spinner } from "@material-tailwind/react";
import { useState } from "react";
import Axios from "../Axios";
import { toast } from "react-toastify";
import CardPedidos from "../components/CardPedidos";
import { useEffect } from "react";

function Pedidos() {
  const [actualizar, setActualizar] = useState(false);

  const { data, isPending } = useGetData("carritos?entregados=0", actualizar);

  const marcarEntregado = async (idCarrito) => {
    const { idusuario, token } = JSON.parse(localStorage.getItem("admin"));

    try {
      await Axios.put(
        `carritos/autorizar/${idCarrito}`,
        { idUser: idusuario },
        { headers: { Authorization: token } }
      );
      toast.success("Marcado como enviado.");
      setActualizar((prev) => !prev);
    } catch (error) {
      toast.error("Error al marcar como enviado");
    }
  };
  const cancelarCart = async (idCarrito) => {
    const { token } = JSON.parse(localStorage.getItem("admin"));
    try {
      await Axios.put(`carritos/cancelar/${idCarrito}`, undefined, {
        headers: { Authorization: token },
      });
      toast.success("Orden cancelada.");
      setActualizar((prev) => !prev);
    } catch (error) {
      toast.error("Error al cancelar orden.");
    }
  };
  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setActualizar((prev) => !prev);
    }, 8000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, []);

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
