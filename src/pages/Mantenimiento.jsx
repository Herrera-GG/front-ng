import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function Mantenimiento() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-10 gap-5">
      <h2 className="text-center">Sitio en mantenimiento</h2>
      <i>¡Volveremos pronto!</i>
      <div className="flex">
        <FontAwesomeIcon icon={faGear} spin className=" size-28 z-50" />
        <FontAwesomeIcon icon={faGear} spin className=" size-12" />
      </div>
      <img
        src="https://images.prismic.io/web-blanco/ZkUv9iol0Zci9Lqh_pngegg.png?auto=format,compress"
        alt="gato"
        className="size-96 animate-bounce drop-shadow-2xl"
      />
    </div>
  );
}

export default Mantenimiento;
