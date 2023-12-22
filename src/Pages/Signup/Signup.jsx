import React, { useState } from "react";
import "./../assets/vendor/css/pages/page-auth.css";
import "./style.min.css";
import logo from "../logo.png";
import signupBack from "./image.png";
import { axios } from "./../axios";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import HandleAlers from "../../components/handleAlers/HandleAlers";

const Signup = () => {
  let { id = "" } = useParams();
  const [success, setSuccess] = useState("");
  const [faild, SetFaild] = useState(id && id.startsWith("The Link") ? id : "");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  let [role = "patient", bool = false] = id.split("-");
  if (bool === "true") bool = true;
  else bool = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    const inf = e.target;
    const obj = {
      first_name: inf[0].value,
      email: inf[1].value,
      password: inf[2].value,
      role: inf[3].value,
      last_name: inf[4].value,
      phone: inf[5].value,
      birthday: inf[6].value,
    };
    const handle = async () => {
      try {
        const response = await axios.post("/users/signup/", obj);
        setSuccess(response.data.message);
      } catch (e) {
        if (e.response.data.message.includes("duplicate")) {
          SetFaild("the Email you provide already exist");
        } else {
          SetFaild(e.response.data.message);
        }
      }
      setIsLoading(false);
    };
    setIsLoading(true);
    handle();
  };

  if (success) {
    navigate("/login");
  }

  if (faild) {
    setTimeout(() => {
      SetFaild("");
    }, 4000);
  }

  return (
    <div
      className="container-xxl"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      {isLoading ? <Loading /> : ""}
      <div className="authentication-wrapper authentication-basic container-p-y">
        {faild ? <HandleAlers message={faild} status={false} /> : ""}
        {faild.startsWith("the Email") ? (
          <Link to="/sign-in">
            <span>Sign in instead</span>
          </Link>
        ) : (
          ""
        )}
        <div className="authentication-inner">
          {/* Register Card */}
          <div className="card">
            <div className="card-body">
              {/* Logo */}
              <div className="app-brand justify-content-center">
                <Link to="/" className="app-brand-link gap-2">
                  <img
                    src={logo}
                    width="150px"
                    height="40px"
                    alt="logo EHEALTH"
                  />
                </Link>
              </div>
              {/* /Logo */}
              <h4 className="mb-2">
                Adventure starts here
                <span role="img" aria-label="emoji">
                  🚀
                </span>
              </h4>
              <p className="mb-4">
                Welcome to our app, where your health is our top priority.
              </p>
              <form
                id="formAuthentication"
                className="mb-3"
                onSubmit={handleSubmit}
              >
                <div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      autoFocus
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email*
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3 form-password-toggle">
                    <label className="form-label" htmlFor="password">
                      Password*
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder="············"
                        aria-describedby="password"
                        required
                      />
                      <span className="input-group-text cursor-pointer">
                        <i className="bx bx-hide" />
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    {bool && role === "jobseeker" ? (
                      <select
                        className="form-select"
                        aria-label=".form-select-sm example"
                        defaultValue={role || "patient"}
                      >
                        <option value="receptionist">Receptionist</option>
                        <option value="nurse">Nurse</option>
                        <option value="auditor">Auditor</option>
                      </select>
                    ) : (
                      <input
                        type="role"
                        className="form-control"
                        id="role"
                        name="role"
                        placeholder="Enter your role"
                        hidden
                        defaultValue={role || "patient"}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <label htmlFor="surname" className="form-label">
                      Surname*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="surname"
                      name="surname"
                      placeholder="Enter your surname"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Date Of Birth*
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      placeholder="Enter your date of birth"
                      required
                    />
                  </div>
                </div>
                <div className="submit">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="terms-conditions"
                        name="terms"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="terms-conditions"
                      >
                        I agree to
                        <a href="youtube.com"> privacy policy &amp; terms</a>
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-primary d-grid w-100">
                    Sign up
                  </button>
                </div>
              </form>
              <p className="text-center">
                <span>Already have an account?</span>
                <Link to="/login">
                  <span>Sign in instead</span>
                </Link>
              </p>
            </div>
          </div>
          {/* Register Card */}
        </div>
        <img
          src={signupBack}
          alt="background sign up"
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            top: "50%",
            right: "30%",
            transform: "translate(60%,-50%)",
          }}
        />
      </div>
    </div>
  );
};

export default Signup;
