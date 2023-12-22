import React, { useEffect, useState } from "react";
import bgchat from "./chatback.webp";
import userImage from "./patient.png"; // Import your user image
import doctorImage from "./doc.png"; // Import your doctor image
import botImage from "./bot.png"; // Import your bot image
import Sidebar from "../../components/sidebar/Sidebar";
import { axios } from "../axios";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

const Messaging = () => {
  const [messages, setMessages] = useState([
    // { id: 1, sender: "patient", content: "Hello, I have a question." },
    // { id: 2, sender: "doctor", content: "Sure, what would you like to ask?" },
    // { id: 3, sender: "bot", content: "I'm here to help!" },
    // Add more messages as needed
  ]);

  const { id } = useParams();

  const userImageUrl = userImage;
  const doctorImageUrl = doctorImage;
  const botImageUrl = botImage;
  const [cookies] = useCookies(["token", "role"]);
  const navigate = useNavigate();

  const handleSendMessage = (content) => {
    if (content.trim() === "") {
      return;
    }

    axios
      .post(
        "/messengers/create_messages/",
        { session: id, content },
        {
          headers: {
            Authorization: `Token ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        navigate(0);
      });

    document.querySelector(".message-input input").value = "";
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(e.target.value);
    }
  };

  useEffect(() => {
    // Scroll to the bottom after adding a new message
    const messageList = document.querySelector(".message-list");
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  useEffect(() => {
    axios
      .get(`/messengers/list_messages/${id}`, {
        headers: {
          Authorization: `Token ${cookies.token}`,
        },
      })
      .then((res) => {
        setMessages(res.data);
      });
  }, []);

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div
          className="messaging-container bg-dark text-light d-flex flex-column h-100"
          style={{ backgroundImage: `url("${bgchat}")`, width: "100%" }}
        >
          <div
            className="message-list overflow-auto p-3"
            style={{ height: "calc(92.6vh - 63px)" }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message p-2 mb-2 ${
                  message.sender === "patient"
                    ? "bg-primary text-white ms-auto"
                    : message.sender === "medic"
                    ? "bg-secondary text-white me-auto"
                    : "bg-info text-white me-auto" // Change bg-info to the color you want for bot messages
                }`}
                style={{
                  width: "fit-content",
                  borderRadius: "10px",
                  maxWidth: "80%",
                  textAlign: message.sender === "patient" ? "left" : "left",
                }}
              >
                {message.sender === "patient" && (
                  <img
                    src={userImageUrl}
                    alt="User"
                    className="user-image me-2"
                    width={"25px"}
                    height={"25px"}
                    style={{ borderRadius: "50%", filter: `invert(100%)` }}
                  />
                )}
                {message.sender === "medic" && (
                  <img
                    src={doctorImageUrl}
                    alt="Doctor"
                    className="doctor-image me-2"
                    width={"25px"}
                    height={"25px"}
                    style={{ borderRadius: "50%", filter: `invert(100%)` }}
                  />
                )}
                {message.sender === "bot" && (
                  <img
                    src={botImageUrl}
                    alt="Bot"
                    className="bot-image me-2"
                    width={"35px"}
                    height={"25px"}
                    style={{ borderRadius: "50%" }}
                  />
                )}
                {message.content}
              </div>
            ))}
          </div>
          <div className="message-input p-2 bg-secondary">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                onKeyDown={handleInputKeyDown}
              />
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleSendMessage(
                    document.querySelector(".message-input input").value
                  )
                }
              >
                Send
              </button>
              <button
                class="ui inverted secondary button"
                style={{ width: "100px", position: "relative" }}
              >
                <input
                  type="file"
                  style={{ opacity: 0, position: "absolute" }}
                />
                upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messaging;
