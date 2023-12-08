import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header.tsx";
import useFetch from "../../hooks/useFetch.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiUrl from "../../constants/UrlApi.ts";
import { format, parseISO } from "date-fns";
import { Student } from "../../types/models";
import useFetchOneStudent from "../../hooks/useFetchOneStudent";

export default function StudentId() {
  const { studentId } = useParams();
  const token: string = localStorage.getItem("authToken");
  const student: Student = useFetchOneStudent(studentId, token);
  const studentTickets = useFetch(`/student/ticket/${studentId}`, token);
  const updateRequest = axios.create({ baseURL: ApiUrl });

  const [editStudent, setEditStudent] = useState(false);
  const [editStudentName, setEditStudentName] = useState("");
  const [editStudentEmail, setEditStudentEmail] = useState("");
  const [editStudentPhone, setEditStudentPhone] = useState("");
  const [updatedStudent, setUpdatedStudent] = useState(student);
  const navigate = useNavigate();

  useEffect(() => {
    if (student) {
      setEditStudentName(student?.name);
      setEditStudentEmail(student?.email);
      setEditStudentPhone(student?.phone);
    }
    setUpdatedStudent(student);
  }, [student, updatedStudent]);

  async function handleEditStudent() {
    const editedStudent = {
      name: editStudentName,
      email: editStudentEmail,
      phone: editStudentPhone,
    };

    updateRequest
      .patch(`/student/${studentId}`, editedStudent, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUpdatedStudent(response.data);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
              {student.createdAt
                ? format(new Date(student.createdAt).getTime(), "dd/MM/yy")
                : ""}
            </td>
            <td>{student?.name}</td>
            <td>{student?.email}</td>
            <td>{student?.phone}</td>
            <td>
              <button
                className="edit-student-button"
                onClick={() => setEditStudent(!editStudent)}
              >
                Editar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {Boolean(editStudent) && (
        <form onSubmit={handleEditStudent}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={(e) => setEditStudentName(e.target.value)}
              value={student?.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={student?.email}
              onChange={(e) => setEditStudentEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={student?.phone}
              onChange={(e) => setEditStudentPhone(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </form>
      )}

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
            {studentTickets?.map((ticket, index) => (
              <tr key={`${ticket?.id} - ${index}`}>
                <td>{ticket.id}</td>
                <td>
                  {ticket.createdAt
                    ? format(new Date(ticket.createdAt).getTime(), "dd/MM/yy")
                    : ""}
                </td>
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
