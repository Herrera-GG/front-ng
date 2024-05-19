import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useGetData from "../hooks/useGetData";
import CardProduct from "../components/CardProduct";

import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import Axios from "../Axios";
import { toast } from "react-toastify";
import { Textarea } from "@material-tailwind/react";
import CardPedidos from "../components/CardPedidos";
import { Spinner } from "@material-tailwind/react";

function Carrito() {
  const [productos, setProductos] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [showDiag, setShowDiag] = useState(false);
  const [numTel, setNumTel] = useState("");
  const [loading, setLoading] = useState(false);
  const [envio, setEnvio] = useState(4);

  const { data, isPending, error } = useGetData(
    `carritos/obtener/${localStorage.getItem("numTel")}`
  );
  console.log(error);

  const productosList = productos.flat(2);

  const send = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post("carritos/crear", {
        ...numTel,
        cantidad: productosList.length,
        total: productosList.reduce(
          (a, b) => Number(a) + Number(b.precioUnitario),
          0
        ),
        productos: productos,
        envio,
      });
      localStorage.setItem("productos", JSON.stringify([]));
      setActualizar((prev) => !prev);
      toast.success("Orden creada.");
    } catch (error) {
      toast.error("Algun producto no tiene existencias");
    }
    setLoading(false);
    setShowDiag(false);
  };
  const handle = (e) => {
    const { name, value } = e.target;
    setNumTel((prev) => ({ ...prev, [name]: value }));
    if (name === "num_tel") {
      localStorage.setItem("numTel", value);
    }
  };

  useEffect(() => {
    const productos = localStorage.getItem("productos");
    const numTel = localStorage.getItem("numTel");
    if (!productos) {
      localStorage.setItem("productos", JSON.stringify([]));
      setProductos([]);
    } else {
      setProductos(JSON.parse(productos));
    }
    if (!numTel) {
      localStorage.setItem("numTel", "");
    } else {
      setNumTel(() => ({ num_tel: numTel }));
    }
  }, [actualizar]);

  useEffect(() => {
    if (productosList.length > 4) {
      setEnvio(0);
    } else {
      setEnvio(4);
    }
  }, [productosList]);

  return (
    <div className="p-5 relative flex flex-col items-center">
      <Dialog open={showDiag} handler={() => setShowDiag(false)}>
        <DialogHeader>Realizar orden</DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-5" onSubmit={send}>
            <Input
              label="Número de teléfono"
              color="blue"
              name="num_tel"
              onChange={handle}
              maxLength="10"
              minLength="10"
              value={numTel.hasOwnProperty("num_tel") ? numTel["num_tel"] : ""}
              required
            />
            <Textarea
              label="Lugar de entrega"
              color="blue"
              resize
              name="lugarEntrega"
              onChange={handle}
              required
            />
            <i>Tú numero de telefono se usara para verificar tu orden.</i>
            <strong className=" text-red-500">
              Si no se logra contactar con el numero de telefono proporcionado,
              se cancelara la orden.
            </strong>
            <Button
              variant="gradient"
              color="blue"
              type="submit"
              loading={loading}
            >
              <span>Confirmar</span>
            </Button>
          </form>
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
        </DialogFooter>
      </Dialog>

      {productos.length > 0 && (
        <>
          <div className="flex flex-col w-full">
            <i>
              Subtotal: ${" "}
              {productosList.reduce(
                (a, b) => Number(a) + Number(b.precioUnitario),
                0
              )}
            </i>
            <i>Envio: ${envio}</i>
            <strong className="w-full border-t-2 text-xl">
              Total: $
              {productosList.reduce(
                (a, b) => Number(a) + Number(b.precioUnitario),
                0
              ) + envio}
            </strong>
          </div>
          <div className="w-full flex items-center justify-center p-5 sticky top-0 bg-white z-50">
            <Button
              color="blue"
              onClick={() => setShowDiag(true)}
            >{`Realizar pedido (${productosList.length}) producto(s)`}</Button>
          </div>
          {productos.map((producto, index) => (
            <CardProduct
              key={producto[0].idproducto}
              data={producto[0]}
              cantidad={producto.length}
              indexElement={index}
              extra={setActualizar}
              isInCart
            />
          ))}
        </>
      )}
      {productos.length <= 0 && (
        <p className="text-center">Agrega productos a tu carrito.</p>
      )}
      {!isPending && !error && (
        <div className="flex flex-col gap-5">
          <h6 className="text-center sticky top-20 bg-white z-50">
            Historial de pedidos
          </h6>
          {data.response.map((el) => (
            <CardPedidos el={el} />
          ))}
        </div>
      )}
      {isPending && <Spinner className="size-40" />}
    </div>
  );
}

export default Carrito;
