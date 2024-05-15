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

function Carrito() {
  const [productos, setProductos] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const { data, isPending } = useGetData("productos");

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
    }
  }, [actualizar]);

  return (
    <div className="p-5 relative">
      {!isPending && (
        <Success
          data={data.response}
          producto={productos}
          setActualizar={setActualizar}
        />
      )}
    </div>
  );
}

const Success = ({ data, producto, setActualizar }) => {
  const [numTel, setNumTel] = useState("");
  const productosMapeados = producto.map(
    (id) => data.filter((product) => product.idproducto === id)[0]
  );
  const [showDiag, setShowDiag] = useState(false);
  const send = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("carritos/crear", {
        ...numTel,
        entregado: false,
        cantidad: producto.length,
        autorizadoPor: null,
        total: productosMapeados.reduce(
          (a, b) => Number(a) + Number(b.precioUnitario),
          0
        ),
        productos: producto,
      });
      localStorage.setItem("productos", JSON.stringify([]));
      setActualizar((prev) => !prev);
      toast.success("Orden creada.");
    } catch (error) {
      console.log(error);
      toast.error("Algun producto no tiene existencias");
    }
    setShowDiag(false);
  };
  const handle = (e) => {
    const { name, value } = e.target;
    setNumTel((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
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
              required
            />
            <i>Tú numero de telefono se usara para verificar tu orden.</i>
            <strong className=" text-red-500">
              Si no se logra contactar con el numero de telefono proporcionado,
              se cancelara la orden.
            </strong>
            <Button variant="gradient" color="blue" type="submit">
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
      <div>
        <i>
          Subtotal: $
          {productosMapeados.reduce(
            (a, b) => Number(a) + Number(b.precioUnitario),
            0
          )}
        </i>
      </div>
      <div className="w-full flex items-center justify-center p-5 sticky top-0 bg-white">
        <Button
          onClick={() => setShowDiag(true)}
        >{`Realizar pedido (${producto.length}) producto(s)`}</Button>
      </div>
      {producto.length > 0 &&
        producto.map((id, index) => (
          <CardProduct
            data={data.filter((producto) => producto.idproducto === id)[0]}
            isInCart
            indexElement={index}
            extra={setActualizar}
          />
        ))}
      {producto.length <= 0 && <p>Agrega productos a tu carrito.</p>}
    </>
  );
};

export default Carrito;
