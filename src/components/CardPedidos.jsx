import { faCircleCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import React from "react";
import { useState } from "react";

function CardPedidos({ el, isInCart, marcarEntregado, cancelarCart }) {
  const [showDiag, setShowDiag] = useState(false);

  return (
    <div className="flex flex-col border rounded-lg w-full p-2 shadow relative">
      <Dialog open={showDiag} handler={() => setShowDiag(false)}>
        <DialogHeader>Realizar orden</DialogHeader>
        <DialogBody>
          <p>Se cancelara la orden, ¿Deseas continuar?</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setShowDiag(false)}
            className="mr-1"
            type="button"
          >
            <span>Cancelar</span>
          </Button>
          <Button
            variant="text"
            color="blue"
            onClick={() => {
              cancelarCart(el.idcarritos);
              setShowDiag(false);
            }}
            className="mr-1"
            type="button"
          >
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {el.cancelado && (
        <div className="absolute text-6xl text-red-600 opacity-90 rotate-45 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          Cancelado
        </div>
      )}
      <strong className="w-full text-end">Orden no. {el.idcarritos}</strong>
      <div className="flex">
        <div className="flex flex-col w-2/4">
          <i>Núm. telefonico: {el.num_tel}</i>
        </div>

        <div className="w-2/4 flex items-center gap-5">
          <span>Entregado: </span>
          {el.entregado ? (
            <FontAwesomeIcon
              className="size-8 text-green-600"
              icon={faCircleCheck}
            />
          ) : (
            <FontAwesomeIcon
              className="size-8 text-orange-600"
              icon={faClock}
            />
          )}
        </div>
      </div>
      <i>Nombre del cliente: {el.nombreCliente}</i>
      <span>Lugar de entrega: {el.lugarEntrega}</span>
      <strong>Productos:</strong>
      <div>
        {JSON.parse(el.productos).map((producto) => (
          <div>
            {producto.length} x {producto[0]["nombre"]}
          </div>
        ))}
      </div>
      <i className="w-full border-t-2">Subtotal: ${el.total}</i>
      <i>Envío: ${el.envio}</i>
      <strong className="w-full border-t-2">
        Total: ${Number(el.total) + el.envio}
      </strong>
      {!isInCart && (
        <div className="flex gap-5">
          <Button
            color="red"
            onClick={() => setShowDiag(true)}
            disabled={el.entregado || el.cancelado}
          >
            Cancelar orden
          </Button>
          <Button
            color="blue"
            onClick={() => marcarEntregado(el.idcarritos)}
            disabled={el.entregado || el.cancelado}
          >
            Marcar entregado
          </Button>
        </div>
      )}
    </div>
  );
}

CardPedidos.defaultProps = {
  isInCart: true,
};

export default CardPedidos;
