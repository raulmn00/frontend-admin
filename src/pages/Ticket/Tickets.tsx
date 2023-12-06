import Header from "../../components/Header.tsx";
import useFetch from "../../hooks/useFetch.ts";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ApiUrl from "../../constants/UrlApi.ts";

export default function Tickets() {
  const token = localStorage.getItem("authToken");
  const tickets = useFetch(`/ticket`, token);

  const url = ApiUrl;
  const [searchTicket, setSearchTicket] = useState("");
  const { ticketId } = useParams();
  const [listTickets, setListTickets] = useState(tickets);
  const navigate = useNavigate();

  useEffect(() => {
    setListTickets([...tickets]);
  }, [tickets, setSearchTicket]);
  async function handleSubmitSearch(e) {
    e.preventDefault();

    const params = {
      subject: searchTicket,
      status: searchTicket,
      description: searchTicket,
    };

    axios
      .get(`${url}/ticket/search/`, {
        params,
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setListTickets(response.data);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleChangeSearch(e) {
    setSearchTicket(e.target.value);
  }

  async function handleResetSearch() {
    setSearchTicket("");
  }

  return (
    <>
      {Boolean(window.location.href === "http://localhost:3001/tickets") && (
        <Header />
      )}

      <form onSubmit={handleSubmitSearch}>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchTicket}
          onChange={handleChangeSearch}
        />
        <div className="buttons">
          <button className="button" onClick={handleResetSearch}>
            Limpar
          </button>
          <button type="submit" className="button">
            Pesquisar
          </button>
        </div>
      </form>

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
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {listTickets?.map((ticket, index) => (
            <tr key={`${ticket?.id} - ${index}`}>
              <td>{ticket.id}</td>
              <td>{ticket.createdAt}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.type}</td>
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
