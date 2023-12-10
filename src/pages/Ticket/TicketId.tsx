import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header.tsx";
import format from "date-fns/format";
import { Message, Ticket } from "../../types/models/models.ts";
import api from "../../utils/api.ts";
import useTicket from "../../hooks/ticket/useTicket.tsx";
import { toast } from "react-toastify";

export default function TicketId() {
  const { ticketId } = useParams();
  const { id: userId } = JSON.parse(localStorage.getItem("user"));
  const { getTicket, getTicketMessages } = useTicket();
  const ticket: Ticket = getTicket(ticketId);
  const oneTicketMessages = getTicketMessages(ticketId);
  const navigate = useNavigate();
  const growers = document.querySelectorAll(".grow-wrap");

  growers.forEach((grower) => {
    const textarea = grower.querySelector("textarea");
    textarea.addEventListener("input", () => {
      grower.dataset.replicatedValue = textarea.value;
    });
  });
  async function handleSendingMessage(e) {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const content = e.target.content.value;
    const bodyMessage = {
      content,
      studentId: ticket?.studentId,
      ticketId: ticket?.id,
      createdBy: userId,
      adminId: userId,
    };

    api
      .post(`/message`, bodyMessage, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        toast.success("Mensagem enviada com sucesso.", { autoClose: 1000 });
        setInterval(() => navigate(0), 1500);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro.");
        console.log(error);
      });
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
            <th></th>
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
            <div className="grow-wrap">
              <textarea
                name="content"
                id="content"
                onInput={() =>
                  "this.parentNode.dataset.replicatedValue = this.value"
                }
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </form>
      )}
    </>
  );
}
