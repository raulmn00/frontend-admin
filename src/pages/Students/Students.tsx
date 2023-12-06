import Header from "../../components/Header.tsx";
import useFetch from "../../hooks/useFetch.ts";
import AppUrl from "../../constants/UrlApp.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiUrl from "../../constants/UrlApi.ts";
import { toast } from "react-toastify";

export default function Students() {
  const token = localStorage.getItem("authToken");
  const students = useFetch(`/student`, token);

  const url = ApiUrl;

  const [isCreatingStudent, setIsCreatingStudent] = useState(false);
  const [createStudentName, setCreateStudentName] = useState("");
  const [createStudentEmail, setCreateStudentEmail] = useState("");
  const [createStudentPhone, setCreateStudentPhone] = useState("");
  const [createStudentPassword, setCreateStudentPassword] = useState("");
  const createStudentRequest = axios.create({ baseURL: ApiUrl });
  const [listStudents, setListStudents] = useState(students)
  const [search, setSearch] = useState("");

  useEffect(() => {

    setListStudents([...students])

  }, [students, setSearch]);
  async function handleCreateStudent(e) {
    e.preventDefault();
    const payload = {
      name: createStudentName,
      email: createStudentEmail,
      phone: createStudentPhone,
      password: createStudentPassword,
    };
    createStudentRequest
      .post("/student", payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        toast.success("Student created.", { autoClose: 1000 });
        setTimeout(() => {
          window.location.href = "/students";
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        params,
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setListStudents(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (event) => {
    setSearch('');
  }

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
          <button className="button" onClick={handleSearch}> Limpar </button>
          <button type="submit" className="button">Pesquisar</button>
        </div>
      </form>

      <div className="students-title">
        <p>Create Student</p>
      </div>
      <div className="text-center mb-7">
        <button
          className="view-ticket"
          onClick={() => setIsCreatingStudent(!isCreatingStudent)}
        >
          {isCreatingStudent ? "Cancelar" : "Criar"}
        </button>
      </div>
      {Boolean(isCreatingStudent) && (
        <form onSubmit={handleCreateStudent}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={(e) => setCreateStudentName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={(e) => setCreateStudentEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              onChange={(e) => setCreateStudentPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              onChange={(e) => setCreateStudentPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </form>
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
          {listStudents?.map((student, index) => (
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
