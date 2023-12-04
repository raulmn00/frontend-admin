import Header from "../../components/Header.tsx";
import useFetch from "../../hooks/useFetch.ts";

export default function Tickets() {
  const token = localStorage.getItem("authToken");
  const tickets = useFetch(`/ticket`, token);

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
