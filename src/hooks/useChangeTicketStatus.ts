import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiUrl from "../constants/UrlApi.ts";

const useChangeTicketStatus = (
  url: string,
  token: string,
  updatedData: any,
) => {
  const [data, setData] = useState(null);

  const api = axios.create({ baseURL: ApiUrl });

  useEffect(() => {
    // Fazer a chamada à API
    api
        .post('https://example.com/tickets/1234567890', data, {
            method: 'PATCH',
            headers: {
                Authorization: token,
            },
        })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url, token]);

  return data;
};

export default useChangeTicketStatus;
