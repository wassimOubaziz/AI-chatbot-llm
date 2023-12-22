import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useOutlet,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import AppNavbar from "../../components/navbar/AppNavbar";
import { axios } from "../axios";

const Patient = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token", "role"]);
  const [sessionList, setSessionList] = useState([{}]);
  const outlet = useOutlet();

  useEffect(() => {
    axios
      .get("/messengers/sessions/", {
        headers: {
          Authorization: `Token ${cookies.token}`,
        },
      })
      .then((res) => {
        const lastFourSessions = res?.data.slice(-4);
        setSessionList(lastFourSessions);
      })
      .catch((e) => console.log(e.message));
  }, []);

  const handleNewSession = () => {
    axios
      .post(
        "/messengers/sessions/",
        {},
        {
          headers: {
            Authorization: `Token ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        navigate(`messaging/${res.data.id}`);
      });
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

  const handleAllSessions = () => {
    navigate("sessions");
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
      <AppNavbar />
      {outlet ? (
        <Outlet />
      ) : (
        <div className="container mt-5">
          {/* Buttons for New Session and All Sessions */}
          <div className="d-grid gap-2 mt-4">
            <button className="btn btn-primary" onClick={handleNewSession}>
              Create New Messaging Session
            </button>
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
                  <div className="extra content">
                    <div className="ui one buttons">
                      <div
                        className="ui basic red button"
                        onClick={handleDelete}
                      >
                        Delete
                      </div>
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

export default Patient;
