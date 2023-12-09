import { useEffect, useState } from "react";
import axios from "axios";
import urlApi from "../../constants/UrlApi.ts";
import { Ticket } from "../../types/models/models.ts";

const useTicket = () => {
  const token = localStorage.getItem("authToken");
  const getStudentTickets = (studentId: string | undefined) => {
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
          console.log("useTicket -> getStudentTickets", err);
        });
    }, [studentId]);

    return data;
  };

  const getAllTickets = () => {
    const api = axios.create({ baseURL: urlApi });
    const [data, setData] = useState([]);
    useEffect(() => {
      api
        .get(`/ticket`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log("useTicket -> getAllTickets", err);
        });
    }, []);
    return data;
  };

  const getTicket = (ticketId: string | undefined): Ticket => {
    const api = axios.create({ baseURL: urlApi });
    const [data, setData] = useState();
    useEffect(() => {
      api
        .get(`/ticket/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log("useTicket -> getTicket", err);
        });
    }, []);
    return data;
  };

  const getTicketMessages = (ticketId: string | undefined) => {
    const api = axios.create({ baseURL: urlApi });
    const [data, setData] = useState([]);
    useEffect(() => {
      api
        .get(`/message/ticketMessages/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log("useTicket -> getTicketMessages", err);
        });
    }, []);
    return data;
  };

  const updateTicket = (payload, ticketId) => {
    const api = axios.create({ baseURL: urlApi });
    const [data, setData] = useState();
    useEffect(() => {}, []);
    return data;
  };

  return {
    getStudentTickets,
    getAllTickets,
    getTicket,
    getTicketMessages,
    updateTicket,
  };
};

export default useTicket;
