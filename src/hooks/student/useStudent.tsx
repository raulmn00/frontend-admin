import { useEffect, useState } from "react";
import axios from "axios";
import urlApi from "../../constants/UrlApi.ts";

export const useStudent = () => {
  const token: string = localStorage.getItem("authToken");
  const getStudent = (id: string | undefined) => {
    const api = axios.create({ baseURL: urlApi });
    const [data, setData] = useState();
    useEffect(() => {
      api
        .get(`/student/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          return error;
        });
    }, [id]);
    return data;
  };

  const getAllStudents = () => {
    const api = axios.create({ baseURL: urlApi });
    const [data, setData] = useState([]);
    useEffect(() => {
      api
        .get("/student", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    }, []);
    return data;
  };

  /////////////////////////////////////
  return { getStudent, getAllStudents };
};

export default useStudent;
