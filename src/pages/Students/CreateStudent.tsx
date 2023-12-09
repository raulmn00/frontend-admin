// <div className="students-title">
//     <p>Criar Estudante</p>
// </div>
// <div className="text-center mb-7">
//     <button
//         className="view-ticket"
//         onClick={() => setIsCreatingStudent(!isCreatingStudent)}
//     >
//         {isCreatingStudent ? "Cancelar" : "Criar"}
//     </button>
// </div>
// {Boolean(isCreatingStudent) && (
//     <form onSubmit={handleCreateStudent}>
//         <div className="form-group">
//             <label htmlFor="name">Nome</label>
//             <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 name="name"
//                 onChange={(e) => setCreateStudentName(e.target.value)}
//             />
//         </div>
//         <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 name="email"
//                 onChange={(e) => setCreateStudentEmail(e.target.value)}
//             />
//         </div>
//         <div className="form-group">
//             <label htmlFor="phone">Telefone</label>
//             <input
//                 type="text"
//                 className="form-control"
//                 id="phone"
//                 name="phone"
//                 onChange={(e) => setCreateStudentPhone(e.target.value)}
//             />
//         </div>
//         <div className="form-group">
//             <label htmlFor="password">Senha</label>
//             <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 name="password"
//                 onChange={(e) => setCreateStudentPassword(e.target.value)}
//             />
//         </div>
//         <button type="submit" className="btn btn-primary">
//             Salvar
//         </button>
//     </form>
// )}

import Header from "../../components/Header.tsx";

export default function CreateStudent() {
  return (
    <>
      <Header />
      <h1>Formulario para criar estudante.</h1>
    </>
  );
}
