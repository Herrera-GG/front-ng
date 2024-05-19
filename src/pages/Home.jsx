import React from "react";
import useGetData from "../hooks/useGetData";
import CardProduct from "../components/CardProduct";
import { Spinner } from "@material-tailwind/react";

function Home() {
  const { data, isPending } = useGetData("productos");
  return (
    <div className=" p-10 flex flex-wrap gap-5 justify-center">
      {!isPending &&
        data.response.map((el) => (
          <CardProduct data={el} key={el.idproducto} />
        ))}
      {isPending && <Spinner className=" size-40" />}
    </div>
  );
}

export default Home;
