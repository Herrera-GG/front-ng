import Axios from "axios";

export const urlMain = "http://localhost:3000";

export const multipartHeader = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};
const token = localStorage.getItem("admin")
  ? JSON.parse(localStorage.getItem("admin")).token
  : null;

console.log(token);

export default Axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
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
