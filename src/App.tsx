import { Route, Routes, Link, useParams } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { RequireAuth } from "./contexts/auth/RequireAuth";
import Login from "./pages/Login.tsx";
import Tickets from "./pages/Ticket/Tickets.tsx";
import TicketId from "./pages/Ticket/TicketId.tsx";
import StudentId from "./pages/Students/StudentId.tsx";
import Students from "./pages/Students/Students.tsx";
import Create from "./pages/Create.tsx";
import UpdateTicket from "./pages/Ticket/UpdateTicket.tsx";
import CreateStudent from "./pages/Students/CreateStudent.tsx";

function App() {
  const params = useParams();
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route
          path="/tickets"
          element={
            <RequireAuth>
              <Tickets />
            </RequireAuth>
          }
        />
        <Route
          path="tickets/:ticketId"
          element={
            <RequireAuth>
              <TicketId />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="tickets/edit/:ticketId"
          element={
            <RequireAuth>
              <UpdateTicket />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="students"
          element={
            <RequireAuth>
              <Students />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="students/:studentId"
          element={
            <RequireAuth>
              <StudentId />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="students/create"
          element={
            <RequireAuth>
              <CreateStudent />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
