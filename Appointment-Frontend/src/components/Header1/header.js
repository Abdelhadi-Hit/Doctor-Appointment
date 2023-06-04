import React from "react";
import "./header.css";
import Logo from "../img/HealthLogo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate("");
  const CurrentUser = JSON.parse(localStorage.getItem("user"));
  console.log(CurrentUser);

  return (
    <header id="header" class="fixed-top">
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <a class="navbar-brand" href="#">
          <img
            className="app-logo "
            src={Logo}
            width="50"
            height="50"
            alt="logo"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-list-4"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-list-4">
          <div className="wrrap">
            <a href="/board">
              <p id="k" className="n-a">
                {" "}
                Dashboard
              </p>
            </a>
            <a href="/search">
              {" "}
              <p id="k" className="n-a">
                {" "}
                Search
              </p>
            </a>
            <a href="/home">
              <p id="k" className="n-a">
                {" "}
                Home
              </p>
            </a>
            <button
              onClick={() => navigate("/doctor/fill")}
              id="o"
              className="n-b"
            >
              {" "}
              Are you a doctor ?
            </button>
          </div>

          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={CurrentUser.image}
                  width="40"
                  height="40"
                  class="rounded-circle"
                />
              </a>
              <div
                id="profile-wrapper"
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    fontFamily: "sans-serif",
                    marginLeft: "1rem",
                    color: "blue",
                  }}
                >
                  {CurrentUser.username}
                </p>
                <a class="dropdown-item" href="/board">
                  Dashboard
                </a>
                <a class="dropdown-item" href="#">
                  Edit Profile
                </a>
                <a class="dropdown-item" href="/">
                  Log Out
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
