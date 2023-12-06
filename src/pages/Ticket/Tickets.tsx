import Header from "../../components/Header.tsx";
import useFetch from "../../hooks/useFetch.ts";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import ApiUrl from "../../constants/UrlApi.ts";

export default function Tickets() {
  const token = localStorage.getItem("authToken");
  const tickets = useFetch(`/ticket`, token);

  const url = ApiUrl;

  const { ticketId } = useParams();
  return (
    <>
      {Boolean(window.location.href === "http://localhost:3001/tickets") && (
        <Header />
      )}

      <div className="tickets-title">
        <p>All Tickets</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Created At</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((ticket, index) => (
            <tr key={`${ticket?.id} - ${index}`}>
              <td>{ticket.id}</td>
              <td>{ticket.createdAt}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td className="text-center">
                <a className="view-ticket" href={`/tickets/${ticket.id}`}>
                  Visualizar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
