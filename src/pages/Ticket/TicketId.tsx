import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.ts";
import Header from "../../components/Header.tsx";
import format from "date-fns/format";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiUrl from "../../constants/UrlApi.ts";

export default function TicketId() {
  const { ticketId } = useParams();
  const { id: userId } = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");
  const ticket = useFetch(`/ticket/${ticketId}`, token);
  const [updatedTicket, setUpdatedTicket] = useState(ticket);
  const updateRequest = axios.create({ baseURL: ApiUrl });
  const oneTicketMessages = useFetch(
    `/message/ticketMessages/${ticketId}`,
    token,
  );
  const navigate = useNavigate();

  const sendMessage = axios.create({ baseURL: ApiUrl });

  const handleChange = (event) => {
    ticket.status = event.target.value;
  };

  useEffect(() => {}, [updatedTicket]);

  async function handleTicketStatus() {
    const token = localStorage.getItem("authToken");
    updateRequest
      .patch(
        `/ticket/changeStatus/${ticketId}`,
        { status: ticket?.status },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((response) => {
        setUpdatedTicket(response.data);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleSendingMessage(e) {
    const token = localStorage.getItem("authToken");

    const content = e.target.content.value;
    const bodyMessage = {
      content,
      studentId: ticket?.studentId,
      ticketId: ticket?.id,
      createdBy: userId,
      adminId: userId,
    };

    try {
      sendMessage
        .post(`/message`, bodyMessage, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setUpdatedTicket(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {}
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
              {ticket.createdAt
                ? format(new Date(ticket.createdAt).getTime(), "dd/MM/yyyy")
                : ""}
            </td>
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
      <h3 className="message-title">Histórico de Mensagens</h3>
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
      {Boolean(ticket?.status !== "closed") && (
        <form onSubmit={handleSendingMessage}>
          <div className="tickets-title">
            <p>Enviar mensagem:</p>
          </div>
          <div className="form-group">
            <label htmlFor="content">Conteúdo: </label>
            <input
              type="text"
              className="form-control"
              id="content"
              name="content"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </form>
      )}
    </>
  );
}
