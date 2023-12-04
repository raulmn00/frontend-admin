import React, { useState, useEffect } from "react";

const TicketTable = ({ tickets }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Define table columns
    setColumns([
      "Id",
      "Created At",
      "Subject",
      "Description",
      "Status",
      "Messages",
    ]);
  }, [tickets]);

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tickets?.map((ticket) => (
            <tr key={ticket.id}>
              {columns.map((column) => {
                if (column === "Messages") {
                  return (
                    <td>
                      {ticket.messages.length > 0 ? (
                        <ul>
                          {ticket.messages.map((message) => (
                            <li key={message.id}>{message.content}</li>
                          ))}
                        </ul>
                      ) : (
                        "-"
                      )}
                    </td>
                  );
                }
                return <td key={column}>{ticket[column]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TicketTable;
