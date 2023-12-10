import Header from "../../components/Header.tsx";
import { useState } from "react";
import axios from "axios";
import urlApi from "../../constants/UrlApi.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateStudent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  async function handleCreateStudent(e) {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const payload = { name, email, password, phone };
    const api = axios.create({ baseURL: urlApi });

    api
      .post("/student", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Estudante criado com sucesso!", { autoClose: 1000 });
        setInterval(() => navigate({ pathname: "/students" }), 1500);
      })
      .catch((error) => {
        error.response.data.message.map((m) => toast.error(m));
      });
  }
  return (
    <>
      <Header />
      <div className="students-title">
        <p>Criar Estudante</p>
      </div>
      <form onSubmit={handleCreateStudent}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </form>
    </>
  );
}
