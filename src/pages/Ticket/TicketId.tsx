import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.ts";
import useChangeTicketStatus from "../../hooks/useChangeTicketStatus.ts";
import Header from "../../components/Header.tsx";
import format from "date-fns/format";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiUrl from "../../constants/UrlApi.ts";

export default function TicketId() {
  const { ticketId } = useParams();
  const token = localStorage.getItem("authToken");
  const ticket = useFetch(`/ticket/${ticketId}`, token);
  const [updatedTicket, setUpdatedTicket] = useState(ticket);
  const updateRequest = axios.create({ baseURL: ApiUrl });
  const oneTicketMessages = useFetch(
    `/message/ticketMessages/${ticketId}`,
    token,
  );

  const handleChange = (event) => {
    ticket.status = event.target.value;
  };

  useEffect(() => {}, [updatedTicket]);

  async function handleTicketStatus() {
    const token = localStorage.getItem("authToken");
    updateRequest
      .patch(`/ticket/changeStatus/${ticketId}`, ticket, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUpdatedTicket(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Header />
      <div className="tickets-title">
        <p>Ticket Infos</p>
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
          <tr>
            <td>{ticketId}</td>
            <td>{ticket?.createdAt}</td>
            <td>{ticket?.subject}</td>
            <td>{ticket?.description}</td>
            <td>{ticket?.status}</td>
          </tr>
        </tbody>
      </table>
      <div className="status-container" onChange={handleChange}>
        <select className="status-select">
          <option value="open">Aberto</option>
          <option value="closed">Encerrado</option>
          <option value="pending">Em atendimento</option>
        </select>
        <button className="status-button" onClick={handleTicketStatus}>
          Alterar status
        </button>
      </div>
      <h3 className="message-title">Messages History</h3>
      {oneTicketMessages?.map((singleMessage, index) => (
        <div
          className="message-container"
          key={`${singleMessage?.id} - ${index}`}
        >
          <div className="message">
            <div className="message-header">
              <p className="message-created-at">
                Criado em:{" "}
                {format(
                  new Date(singleMessage?.createdAt),
                  "dd/MM/yyyy - hh:mm",
                )}
              </p>
            </div>
            <div className="message-meta">
              <p className="message-author">
                Autor: {singleMessage?.createdBy?.name}
              </p>
              <p className="message-email">
                E-mail: {singleMessage?.createdBy?.email}
              </p>
            </div>

            <div className="message-body">
              <p>{singleMessage?.content} </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
