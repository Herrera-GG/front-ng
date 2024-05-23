import React from "react";
import Bar from "../components/charts/Bar";

import useGetData from "../hooks/useGetData";

function Dashboard() {
  const { data } = useGetData("carritos?entregados=1");
  console.log(data);
  return (
    <div className="p-10">
      Dashboard
      <Bar />
    </div>
  );
}

export default Dashboard;
