import React from "react";
import backgroundImage from "./assets/xyz.gif";
import { Link } from "react-router-dom";
import "../App.css";
const HomePage = ({ account, setAccount }) => {
  return (
    <div>
      <div
        className="home-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1>
          <span
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "10px",
              opacity: "0.5",
              padding: "10px",
            }}
          >
            Health Information Exchange
          </span>
        </h1>

        <p
          className="subheading"
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "black",
            fontStyle: "italic",
          }}
        >
          Ensure that your records are safe and sound
        </p>

        <Link to="/aboutUs">
          <button
            className="about-button"
            style={{ fontSize: "20px", borderRadius: "10px", width: "200px" }}
          >
            About Us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
