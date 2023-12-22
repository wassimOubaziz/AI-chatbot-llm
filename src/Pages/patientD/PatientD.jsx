import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useOutlet,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { axios } from "../axios";

const PatientD = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token", "role"]);
  const [sessionList, setSessionList] = useState([{}]);
  const outlet = useOutlet();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/messengers/patient_sessions/${id}/`, {
        headers: {
          Authorization: `Token ${cookies.token}`,
        },
      })
      .then((res) => {
        const lastFourSessions = res?.data.slice(-4);
        setSessionList(lastFourSessions);
      })
      .catch((e) => console.log("error"));
  }, []);

  const handleNewSession = () => {
    navigate("messaging");
  };

  const handleAllSessions = () => {
    navigate(`/doctor/sessions/${id}`);
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    }
  }, []);

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid timestamp");
      }
      const formattedDate = date.toISOString().split("T")[0];
      return formattedDate;
    } catch (error) {
      console.error("Error formatting timestamp:", error.message);
      return "Invalid Date";
    }
  };

  return (
    <>
      {outlet ? (
        <Outlet />
      ) : (
        <div className="container mt-5">
          {/* Buttons for New Session and All Sessions */}
          <div className="d-grid gap-2 mt-4">
            <button
              className="btn btn-success mt-2"
              onClick={handleAllSessions}
            >
              View All Sessions
            </button>
          </div>

          {/* Session List */}
          <div className="mt-4">
            <h2>Most Recent Sessions</h2>
            <div
              className="ui cards"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {sessionList.map((session) => (
                <Link
                  to={`/patient/messaging/${session.id}`}
                  className="card"
                  key={session.id}
                >
                  <div className="content">
                    <div className="header">Session {session.id}</div>
                    <div className="meta">
                      <strong>Date:</strong>{" "}
                      {formatTimestamp(session.timestamp)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientD;
