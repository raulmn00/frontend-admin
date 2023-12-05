import Header from "../../components/Header.tsx";
import useFetch from "../../hooks/useFetch.ts";

export default function Students() {
  const token = localStorage.getItem("authToken");
  const students = useFetch(`/student`, token);

  return (
    <>
      {Boolean(window.location.href === 'http://localhost:3001/students') && (
          <Header/>
      )}
      <div className="students-title">
        <p>All Students</p>
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
          {students?.map((student, index) => (
            <tr key={`${student?.id} - ${index}`}>
              <td>{student.id}</td>
              <td>{student.createdAt}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td className="text-center">
                <a className="view-ticket" href={`/students/${student.id}`}>
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
