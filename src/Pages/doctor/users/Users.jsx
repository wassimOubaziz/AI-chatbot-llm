import React, { useState, useEffect } from "react";
import { axios } from "./../../../Pages/axios";
import { useCookies } from "react-cookie";
import Pagination from "react-js-pagination";
import "./users.css";
import { Link, useNavigate, useOutlet, Outlet } from "react-router-dom";
import AppNavbar from "../../../components/navbar/AppNavbar";

function Users() {
  const [cookies] = useCookies(["token"]);
  const [failed, setFailed] = useState(``);
  const [success, setSuccess] = useState(``);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [usersNum, setUsersNum] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const outlet = useOutlet();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/all_patients/`, {
        headers: {
          Authorization: `token ${cookies.token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setUsersNum(res.data?.length);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setFailed(err?.response?.data?.message);
      });
  }, [activePage, cookies.token, searchTerm]);

  useEffect(() => {
    if (!cookies.token || cookies.role !== "medic") {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <AppNavbar />
      {outlet ? (
        <Outlet />
      ) : (
        <div className="container mt-3 mb-4">
          <div className="col-lg-12 mt-4 mt-lg-0">
            <div className="row justify-content-center align-items-center mb-4">
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => setActivePage(1)}
                >
                  Search
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                  <table className="table manage-candidates-top mb-0">
                    <thead>
                      <tr>
                        <th>Candidate Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((user, index) => {
                        return (
                          <Link
                            to={`patient/${user.id}`}
                            className="candidates-list"
                            key={user.id}
                          >
                            <td className="title">
                              <div className="thumb">
                                <img
                                  className="img-fluid"
                                  src={`https://robohash.org/${user.id}`}
                                  alt=""
                                />
                              </div>
                              <div className="candidate-list-details">
                                <div className="candidate-list-info">
                                  <div className="candidate-list-title">
                                    <h5 className="mb-0">
                                      <span className="">
                                        {
                                          //make the name capital
                                          user.first_name
                                            .charAt(0)
                                            .toUpperCase() +
                                            user.first_name.slice(1) +
                                            " " +
                                            user.last_name
                                              .charAt(0)
                                              .toUpperCase() +
                                            user.last_name.slice(1)
                                        }
                                      </span>
                                    </h5>
                                  </div>
                                  <div className="candidate-list-option">
                                    <ul className="list-unstyled">
                                      <li>
                                        <i className="fas fa-filter pr-1"></i>
                                        patient
                                      </li>
                                      <li>
                                        <i className="fas fa-map-marker-alt pr-1"></i>
                                        {/* {user?.address?.charAt(0) +
                                      user?.address?.slice(1)} */}
                                      </li>
                                    </ul>
                                    <li style={{ listStyle: "none" }}>
                                      {/* for email */}
                                      <a
                                        href={`mailto:${user?.email}`}
                                        style={{ fontSize: "13px" }}
                                      >
                                        <i className="fas fa-envelope pr-1"></i>{" "}
                                        {user?.email}
                                      </a>
                                    </li>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </Link>
                        );
                      })}
                    </tbody>
                  </table>
                  {loading && (
                    <div className="mt-3 text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                  {data?.length === 0 && !loading && (
                    <div className="mt-3 text-center">
                      <p>No users found.</p>
                    </div>
                  )}
                  <div
                    className="pagination-wrap"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={5}
                      totalItemsCount={usersNum}
                      pageRangeDisplayed={5}
                      onChange={(pageNumber) => setActivePage(pageNumber)}
                      itemClass="page-item"
                      linkClass="page-link"
                      prevPageText="Previous"
                      nextPageText="Next"
                      hideFirstLastPages={true}
                      hideDisabled={true}
                      activeClass="active"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Users;
