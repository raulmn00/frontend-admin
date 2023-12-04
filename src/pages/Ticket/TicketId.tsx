import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.ts";
import Header from "../../components/Header.tsx";
import format from "date-fns/format";

export default function TicketId() {
  const { ticketId } = useParams();
  const token = localStorage.getItem("authToken");
  const oneTicket = useFetch(`/ticket/${ticketId}`, token);

  const oneTicketMessages = useFetch(
    `/message/ticketMessages/${ticketId}`,
    token,
  );

  return (
    <>
      <Header />
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
            <td>{oneTicket?.createdAt}</td>
            <td>{oneTicket?.subject}</td>
            <td>{oneTicket?.description}</td>
            <td>{oneTicket?.status}</td>
          </tr>
        </tbody>
      </table>
      <h3>Messages History</h3>
      {oneTicketMessages?.map((singleMessage, index) => (
        <div className="message" key={`${index} - ${singleMessage?.id}`}>
          <div className="message-body">
            <p>Infos: </p>
          </div>
          <div className="message-header">
            <p className="message-created-at">
              Criado em:{" "}
              {format(new Date(singleMessage?.createdAt), "dd/MM/yyyy - hh:mm")}
            </p>
          </div>
          <div className="message-meta">
            <h4 className="message-subject">
              Content: {singleMessage?.content}
            </h4>
            <p className="message-author">
              Author: {singleMessage?.createdBy?.name}
            </p>
            <p className="message-email">
              E-mail: {singleMessage?.createdBy?.email}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
