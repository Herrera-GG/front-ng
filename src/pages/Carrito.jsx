import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useGetData from "../hooks/useGetData";
import CardProduct from "../components/CardProduct";
import Button from "../components/Button";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

function Carrito() {
  const [productos, setProductos] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const { data, isPending } = useGetData("productos");

  useEffect(() => {
    const productos = localStorage.getItem("productos");
    if (!productos) {
      localStorage.setItem("productos", JSON.stringify([]));
      setProductos([]);
    } else {
      setProductos(JSON.parse(productos));
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
  const productosMapeados = producto.map(
    (id) => data.filter((product) => product.idproducto === id)[0]
  );
  const [showDiag, setShowDiag] = useState(false);

  return (
    <>
      <Dialog open={showDiag} handler={() => setShowDiag(false)}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setShowDiag(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => setShowDiag(false)}
          >
            <span>Confirm</span>
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
          label={`Realizar pedido (${producto.length}) producto(s)`}
          action={() => setShowDiag(true)}
        />
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
