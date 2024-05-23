import React from "react";
import Bar from "../components/charts/Bar";

import useGetData from "../hooks/useGetData";
import { useMemo } from "react";
import agruparArr from "../utils/agrupar";

function Dashboard() {
  const { data, isPending } = useGetData("carritos?entregados=1");

  const { totalVendido, dataBar, ventasEnPesos, totalProductos } =
    useMemo(() => {
      if (!isPending) {
        const datos = data.response;
        const totalVendido = datos.reduce(
          (a, b) => Number(a) + Number(b.total),
          0
        );
        const productos = agruparArr(
          datos.map((el) => JSON.parse(el.productos)).flat(2),
          (el) => el.idproducto
        ).values();

        const dataBar = {
          labels: ["Productos"],
          datasets: productos.map((el) => ({
            data: [el.length],
            label: el[0].nombre,
          })),
        };
        const ventasEnPesos = {
          labels: ["Productos"],
          datasets: productos.map((el) => ({
            data: [
              el.reduce((a, b) => Number(a) + Number(b.precioUnitario), 0),
            ],
            label: el[0].nombre,
          })),
        };
        console.log(ventasEnPesos, productos);

        return {
          totalVendido,
          dataBar,
          ventasEnPesos,
          totalProductos: productos.flat(1).length,
        };
      } else {
        return {};
      }
    }, [data, isPending]);

  console.log(totalVendido);
  return (
    <div className="p-10 relative">
      <h5 className="sticky top-0 bg-white/50 p-2 backdrop-blur-sm text-center">
        Dashboard
      </h5>
      <div>Total de ingresos global: ${totalVendido}</div>
      <div>Total de produtos vendidos: {totalProductos}</div>
      <div className="w-full h-96 ">
        <Bar datos={dataBar} title="Número de ventas por productos" />
      </div>
      <div className="w-full h-96 ">
        <Bar datos={ventasEnPesos} title="Total de ventas en $ por productos" />
      </div>
    </div>
  );
}

export default Dashboard;
