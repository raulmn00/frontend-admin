import { Ticket } from "../../types/models.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import urlApi from "../../constants/UrlApi.ts";

const useAxiosStudentTickets = (studentId: string, token: string): Ticket[] => {
  const [data, setData] = useState();

  const api = axios.create({ baseURL: urlApi });

  useEffect(() => {
    api
      .get(`/student/ticket/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log("useAxiosStudentTickets", err);
      });
  }, [studentId, token]);

  return data;
};

export default useAxiosStudentTickets;
