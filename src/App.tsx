import { Route, Routes, Link, useParams } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { RequireAuth } from "./contexts/auth/RequireAuth";
import Login from "./pages/Login.tsx";
import Tickets from "./pages/Ticket/Tickets.tsx";
import TicketId from "./pages/Ticket/TicketId.tsx";
import StudentId from "./pages/Students/StudentId.tsx";
import Students from "./pages/Students/Students.tsx";
import Create from "./pages/Create.tsx";

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
      </Routes>
    </div>
  );
}

export default App;
