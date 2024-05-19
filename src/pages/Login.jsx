import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import React from "react";
import Axios from "../Axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigation = useNavigate();
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(false);
  const login = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post("usuarios/login", datos);
      console.log(res);
      localStorage.setItem("admin", JSON.stringify(res.data.response));
      toast.success("Logeado correctamente");
      navigation("/pedidos");
    } catch (error) {
      toast.error("Usuario o contraseña incorrectos.");
    }
    setLoading(false);
  };
  const handle = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form className="p-10 flex flex-col gap-5 items-center" onSubmit={login}>
      <h6>Ingreso a administradores</h6>
      <Input
        label="Usuario"
        color="blue"
        required
        name="user"
        onChange={handle}
      />
      <Input
        label="Contraseña"
        color="blue"
        type="password"
        required
        name="password"
        onChange={handle}
      />
      <Button color="blue" type="submit" loading={loading}>
        Ingresar
      </Button>
    </form>
  );
}

export default Login;
