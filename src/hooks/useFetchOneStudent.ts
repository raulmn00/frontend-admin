import { Student } from "../types/models.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiUrl from "../constants/UrlApi.ts";

const useFetchOneStudent = (studentId: string, token: string): Student => {
  const [data, setData] = useState();

  const api = axios.create({ baseURL: ApiUrl });

  useEffect(() => {
    api
      .get(`/student/${studentId}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [studentId, token]);

  return data;
};

export default useFetchOneStudent;
