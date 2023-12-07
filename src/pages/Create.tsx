import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ApiUrl from "../constants/UrlApi.ts";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.tsx";

export default function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const createAdminRequest = axios.create({ baseURL: ApiUrl });
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida os dados do formulário
    if (!name || !email || !password) {
      toast.error(
        "Some fields are empty. Please fill all fields and try create again.",
      );
      return;
    }

    const payload = { name, email, phone, password };

    createAdminRequest
      .post("/admin", payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        toast.success("User created.", { autoClose: 1300 });
        setInterval(() => navigate({ pathname: "/login" }), 1500);
      })
      .catch((err) => {
        toast.error(err.response.data.message, { autoClose: 1500 });
        console.log(err.response.data.message);
      });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="create-account-form">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Criar conta</button>
        </form>
        <div className="mt-2 text-center">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Already have a account?
          </h2>
          <button>
            <a href="/login" className="view-ticket">
              Login here!
            </a>
          </button>
        </div>
      </div>
    </>
  );
}
