import { useParams } from "react-router-dom";
import Header from "../../components/Header.tsx";
import { format } from "date-fns";
import { Ticket } from "../../types/models/models.ts";
import { useStudent } from "../../hooks/student/useStudent.tsx";
import useTicket from "../../hooks/ticket/useTicket.tsx";

export default function StudentId() {
  const { studentId } = useParams();
  const { getStudent } = useStudent();
  const { getStudentTickets } = useTicket();
  const student = getStudent(studentId);
  const studentTickets = getStudentTickets(studentId);

  return (
    <>
      <Header />
      <div className="tickets-title">
        <p>Informações do Estudante</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Criação</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{studentId}</td>
            <td>
              {student?.createdAt
                ? format(new Date(student?.createdAt).getTime(), "dd/MM/yy")
                : ""}
            </td>
            <td>{student?.name}</td>
            <td>{student?.email}</td>
            <td>{student?.phone}</td>
          </tr>
        </tbody>
      </table>

      <div className="students-tickets-title">
        <p>Tickets do Estudante</p>
      </div>
      {Boolean(studentTickets?.length == 0) && (
        <div className="tickets-title">
          <p>Nenhum ticket encontrado.</p>
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
            {studentTickets?.map((ticket: Ticket, index: number) => (
              <tr key={`${ticket?.id} - ${index}`}>
                <td>{ticket.id}</td>
                <td>
                  {ticket?.createdAt
                    ? format(new Date(ticket.createdAt).getTime(), "dd/MM/yy")
                    : ""}
                </td>
                <td>{ticket?.subject}</td>
                <td>{ticket?.description}</td>
                <td>{ticket?.status}</td>
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
