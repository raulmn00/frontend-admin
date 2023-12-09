import { useParams } from "react-router-dom";
import Header from "../../components/Header.tsx";
import format from "date-fns/format";
import { Message, Ticket } from "../../types/models/models.ts";
import api from "../../utils/api.ts";
import useTicket from "../../hooks/ticket/useTicket.tsx";

export default function TicketId() {
  const { ticketId } = useParams();
  const { id: userId } = JSON.parse(localStorage.getItem("user"));
  const { getTicket, getTicketMessages } = useTicket();
  const ticket: Ticket = getTicket(ticketId);
  const oneTicketMessages = getTicketMessages(ticketId);
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
      api
        .post(`/message`, bodyMessage, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {}
  }

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
            <td className="text-center">
              <a className="view-ticket" href={`/tickets/edit/${ticket?.id}`}>
                Editar
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <h3 className="message-title">Histórico de Mensagens</h3>
      {oneTicketMessages?.map((singleMessage: Message, index) => (
        <div
          className="message-container"
          key={`${singleMessage?.id} - ${index}`}
        >
          <div
            className={`message-${
              singleMessage.createdByAdmin ? "admin" : "student"
            }`}
          >
            <div className="message-header">
              <p className="message-created-at">
                Criado em:{" "}
                {singleMessage.createdAt
                  ? format(
                      new Date(singleMessage.createdAt),
                      "dd/MM/yyyy - hh:mm",
                    )
                  : ""}
              </p>
            </div>
            <div className="message-meta">
              <p>
                Mensagem do -{" "}
                {singleMessage.createdByAdmin ? "Administrador" : "Estudante"}
              </p>
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
