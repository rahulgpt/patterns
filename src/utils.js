import axios from "axios";

export const authAxios = axios.create({
  headers: {
    Authorization: `Token ${localStorage.getItem("_shpuid")}`,
  },
});
