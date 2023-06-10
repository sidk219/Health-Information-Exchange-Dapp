import React, { useEffect } from "react";
import backgroundImage from "./assets/corr.jpg";

const AboutUs = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/bhenfmcm.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="about-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h2 className="about-title">
        <b>About Us</b>
      </h2>
      <p className="about-content">
        This Hospitals is committed to providing high quality, cost-efficient
        healthcare in its hospitals and clinics. We are able to provide free,
        no-obligation quotes for a wide range of treatments, consultations and
        tests to our self-pay patients. We also provide care to insurance
        patients..
      </p>
      <p className="about-content">
        Our reputation for outstanding care and family-like atmosphere, together
        with advanced medical technology and facilities ensures we attract
        leading consultants and specialists from the industry to work with us.
      </p>
      <p className="about-content">
        All our clinicians are board-certified and come with very high
        credentials within their field of speciality. Many of our consultant
        doctors are internationally recognised as well. Whilst practicing at our
        facilities, our consultants comply with Clinical Governance system that
        ensures adequate patient care. All our nurses are fully qualified and
        registered with the Nursing Council.
      </p>

      <div className="icons-wrapper">
        <lord-icon
          src="https://cdn.lordicon.com/uvqnvwbl.json"
          trigger="hover"
          colors="primary:#121331"
          style={{ width: "100px", height: "100px" }}
        ></lord-icon>

        <a href="mailto:sachin.kumar@mitaoe.ac.in">
          <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
          <lord-icon
            src="https://cdn.lordicon.com/ehfubvwr.json"
            trigger="boomerang"
            colors="primary:#121331"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
        </a>

        <a href="https://web.whatsapp.com/">
          <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
          <lord-icon
            src="https://cdn.lordicon.com/pkmkagva.json"
            trigger="boomerang"
            colors="primary:#121331"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
        </a>

        <a href="https://www.google.com/maps/place/MIT+Academy+of+Engineering/@18.674978,73.8902252,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c880511d7c35:0xc4e495a8c1f663eb!8m2!3d18.674978!4d73.8928001!16s%2Fg%2F11h3bgzn07?authuser=1&entry=ttu">
          <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
          <lord-icon
            src="https://cdn.lordicon.com/oaflahpk.json"
            trigger="hover"
            colors="primary:#4bb3fd"
            stroke="65"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
