import { CreateStudent } from "../../types/dto/CreateStudent.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import urlApi from "../../constants/UrlApi.ts";
import { toast } from "react-toastify";

const useAxiosCreateStudent = (payload: CreateStudent, token: string) => {
  const [data, setData] = useState();

  const api = axios.create({ baseURL: urlApi });

  useEffect(() => {
    api
      .post("/student", payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
        toast.success("Estudante criado com sucesso!", { autoClose: 1000 });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
    return data;
  }, [payload, token]);
};

export default useAxiosCreateStudent;
