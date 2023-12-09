import Header from "../../components/Header.tsx";
import AppUrl from "../../constants/UrlApp.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiUrl from "../../constants/UrlApi.ts";
import format from "date-fns/format";
import { toast } from "react-toastify";
import useStudent from "../../hooks/student/useStudent.tsx";

export default function Students() {
  const { getAllStudents } = useStudent();
  const students = getAllStudents();

  const url = ApiUrl;
  const [listStudents, setListStudents] = useState(students);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setListStudents([...students]);
  }, [students, setSearch]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const params = {
      name: search,
      email: search,
      phone: search,
    };

    axios
      .get(`${url}/student/search/`, {
        params: params,
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setListStudents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast.error(
          "O termo que você procurou não existe. Por favor, tente outra pesquisa.",
        );
        console.log(error);
      });
  };

  const handleSearch = (event) => {
    setSearch("");
  };

  return (
    <>
      {Boolean(window.location.href === `${AppUrl}/students`) && <Header />}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pesquisar"
          value={search}
          onChange={handleChange}
        />
        <div className="buttons">
          <button className="button" onClick={handleSearch}>
            Limpar
          </button>
          <button type="submit" className="button">
            Pesquisar
          </button>
        </div>
      </form>
      <div className="create-student-button">
        <a className="btn-primary" href="/students/create">
          Criar Estudante
        </a>
      </div>

      <div className="students-title">
        <p>Estudantes</p>
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
          {listStudents?.map((student, index) => (
            <tr key={`${student?.id} - ${index}`}>
              <td>{student?.id}</td>
              <td>
                {student?.createdAt
                  ? format(new Date(student?.createdAt), "dd/MM/yy")
                  : ""}
              </td>
              <td>{student?.name}</td>
              <td>{student?.email}</td>
              <td>{student?.phone}</td>
              <td className="text-center">
                <a className="view-ticket" href={`/students/${student?.id}`}>
                  Visualizar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Boolean(listStudents?.length == 0) && (
        <div className="not-found-students-title">
          <p>Nenhum estudante encontrado</p>
        </div>
      )}
    </>
  );
}
