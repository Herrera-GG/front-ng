import React from "react";
import useGetData from "../hooks/useGetData";
import CardProduct from "../components/CardProduct";

function Home() {
  const { data, isPending } = useGetData("productos");
  return (
    <div className="p-5">
      {!isPending &&
        data.response.map((el) => (
          <CardProduct data={el} key={el.idproducto} />
        ))}
    </div>
  );
}

export default Home;
