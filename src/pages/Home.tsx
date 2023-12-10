import Header from "../components/Header.tsx";
import Students from "./Students/Students.tsx";
import Tickets from "./Ticket/Tickets.tsx";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container-home">
        <div className="container-students">
          <Students />
        </div>
        <div className="container-tickets">
          <Tickets />
        </div>
      </div>
    </>
  );
}
