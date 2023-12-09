import { useParams } from "react-router-dom";
import useTicket from "../../hooks/ticket/useTicket.tsx";
import Header from "../../components/Header.tsx";
import format from "date-fns/format";
import { useEffect, useState } from "react";
import EditTicket from "../../components/EditTicket.tsx";

export default function UpdateTicket() {
  const { ticketId } = useParams();
  const { getTicket } = useTicket();
  const ticket = getTicket(ticketId);

  return (
    <>
      <Header />
      <div className="tickets-title">
        <p>Informações do Ticket</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Criação</th>
            <th>Assunto</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ticketId}</td>
            <td>
              {ticket?.createdAt
                ? format(new Date(ticket.createdAt).getTime(), "dd/MM/yyyy")
                : ""}
            </td>
            <td>{ticket?.subject}</td>
            <td>{ticket?.description}</td>
            <td>{ticket?.status}</td>
          </tr>
        </tbody>
      </table>
      <EditTicket />
    </>
  );
}
