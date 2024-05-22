import Axios from "axios";

export const urlMain = "https://api.programacion-blanco.com";

export const multipartHeader = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};

export default Axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: urlMain + "/api/",
  /*  validateStatus: function (status) {
    console.log({ status });
    if (status === 403) {
      window.location.href = "/login";
      localStorage.removeItem("user");
    }

    return status >= 200 && status < 300; // default
  }, */
});
