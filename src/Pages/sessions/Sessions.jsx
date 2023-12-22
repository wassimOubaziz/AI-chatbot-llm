// src/components/Sessions.js
import React, { useEffect, useState } from "react";
import { axios } from "../axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Sessions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cookies] = useCookies(["token", "role"]);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/messengers/sessions/", {
        headers: {
          Authorization: `Token ${cookies.token}`,
        },
      })
      .then((res) => {
        const lastFourSessions = res?.data;
        setSessions(lastFourSessions);
      })
      .catch((e) => console.log(e.message));
  }, [cookies.token]);

  const filteredSessions = sessions.filter((session) => {
    // Check if session.timestamp is defined before using the includes method
    return session.timestamp && session.timestamp.includes(searchTerm);
  });

  const formatTimestamp = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-GB"); // Adjust the locale as needed
    }
    return "";
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `/messengers/delete_session/${id}/`,
        {
          headers: {
            Authorization: `Token ${cookies.token}`,
          },
        },
        { id: id }
      )
      .then((res) => {
        navigate(0);
      })
      .catch((e) => navigate(0));
  };

  return (
    <>
      <div className="container mt-5">
        <h1>All Sessions</h1>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by date or title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-3"
        />

        {/* Session List */}
        <div
          className="ui cards"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {filteredSessions.map((session) => (
            <Link
              to={`/patient/messaging/${session.id}`}
              className="card"
              key={session.id}
            >
              <div className="content">
                <div className="header">Session {session.id}</div>
                <div className="meta">
                  <strong>Date:</strong> {formatTimestamp(session.timestamp)}
                </div>
              </div>
              <div className="extra content">
                <div className="ui one buttons">
                  <div
                    className="ui basic red button"
                    onClick={() => {
                      handleDelete(session.id);
                    }}
                  >
                    Delete
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sessions;
