import { useParams } from "react-router-dom";

export default function StudentId() {
  const { studentId } = useParams();

  return (
    <>
      <h1>Estudante - :{studentId}</h1>
    </>
  );
}
