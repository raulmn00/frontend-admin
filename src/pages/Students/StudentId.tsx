import { useParams } from "react-router-dom";
import Header from "../../components/Header.tsx";
import useFetch from "../../hooks/useFetch.ts";

export default function StudentId() {
  const { studentId } = useParams();
  const token = localStorage.getItem("authToken");
  const student = useFetch(`/student/${studentId}`, token);
  const studentTickets = useFetch(`/student/ticket/${studentId}`, token);


  return (
    <>
      <Header />
        <div className="tickets-title">
            <p>Student Infos</p>
        </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Created At</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{studentId}</td>
            <td>{student?.createdAt}</td>
            <td>{student?.name}</td>
            <td>{student?.email}</td>
            <td>{student?.phone}</td>
          </tr>
        </tbody>
      </table>

        <div className="students-tickets-title">
            <p>All Students Tickets</p>
        </div>
        {Boolean(studentTickets?.length == 0) && (
            <div className="tickets-title">
                <p>No tickets founded.</p>
            </div>
        )}
        {Boolean(studentTickets?.length > 0) && (
        <table className="students-tickets-table">
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

            {
                studentTickets?.map((ticket, index) => (
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
        )}
    </>
  );
}
