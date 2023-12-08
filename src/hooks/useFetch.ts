import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiUrl from "../constants/UrlApi.ts";
import { useNavigate } from "react-router-dom";

const useFetch = (url: string, token: string): Promise<any> => {
  const [data, setData] = useState([]);

  const api = axios.create({ baseURL: ApiUrl });

  useEffect(() => {
    // Fazer a chamada à API
    api
      .get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        window.location.href = "/login";
        console.log(error);
      });
  }, [url, token]);

  return data;
};

export default useFetch;
