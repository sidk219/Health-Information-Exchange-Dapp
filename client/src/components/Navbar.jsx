import React from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

const Navbar = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>

      <div className="dropdown">
        <button className="dropbtn">Patients</button>
        <div className="dropdown-content">
          <Link to="/registerPatient">Register Patient</Link>
          <Link to="/editPatientProfile">Edit Patient Profile</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Doctors</button>
        <div className="dropdown-content">
          <Link to="/registerDoctor">Register Doctor</Link>
          <Link to="/editDoctorDetails">Edit Doctor Profile</Link>
          <Link to="/viewDoctorProfile">View Doctor Profile</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Reports</button>
        <div className="dropdown-content">
          <Link to="/createAppointment">Add Report</Link>
          {/* <Link to="/updateAppointment">Update Appointment</Link> */}
        </div>
      </div>
      <Link to="/grantAccess">Grant Access</Link>
      <Link to="/viewPatientRecords">Records</Link>

      <div className="navbar-account">
        {account ? (
          <button
            type="button"
            className="account-btn"
            onClick={connectHandler}
          >
            {account.slice(0, 6) + "..." + account.slice(38, 42)}
          </button>
        ) : (
          <button
            type="button"
            className="account-btn"
            onClick={connectHandler}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
