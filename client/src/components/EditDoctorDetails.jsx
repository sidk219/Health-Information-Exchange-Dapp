import React from "react";
import { ethers } from "ethers";

const EditDoctorDetails = ({ state, accounts, setAccount }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const ic = document.getElementById("ic").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dob = document.getElementById("dob").value;
    const qualification = document.getElementById("qualification").value;
    const major = document.getElementById("major").value;
    accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
    try {
      const editDocTransaction = await contract.editDoctor(
        ic,
        name,
        phone,
        gender,
        dob,
        major,
        qualification
      );
      await editDocTransaction.wait();
      console.log("Form submitted successfully!");
      console.log("Doctor Details edited successfully!");
      console.log(`IC: ${ic}`);
      console.log(`Full Name: ${name}`);
      console.log(`Phone no: ${phone}`);
      console.log(`Gender: ${gender}`);
      console.log(`DOB: ${dob}`);
      console.log(`Major: ${major}`);
      console.log(`Qualification: ${qualification}`);
    } catch (error) {
      console.error("Error:", error);
    }

    event.target.reset();
  };
  return (
    <div>
      <h1>Edit Doctor Details</h1>
      <div className="box">
        <div className="container-md">
          <h2>Doctor Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="section">
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="id">
                    IC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ic"
                    placeholder="Enter Your IC"
                    pattern="DOC\d{6}[A-Za-z]{2}"
                    required
                  />
                  <small className="form-text text-muted">
                    Example: AB123456CD
                  </small>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Your Name"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Phone no</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Enter Your Phone Number"
                    pattern="[0-9]{10}"
                    required
                  />
                  <br></br>
                  <small className="form-text text-muted">
                    Please enter a 10-digit phone number.
                  </small>
                  <br></br>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="Male"
                      required
                    />
                    Male
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="Female"
                      required
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      id="other"
                      value="Other"
                      required
                    />
                    Other
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">DOB</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    placeholder="Enter Your Date of Birth"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Qualification</label>
                  <input
                    type="text"
                    className="form-control"
                    id="qualification"
                    placeholder="Enter Your Qualification"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Major</label>
                  <input
                    type="text"
                    className="form-control"
                    id="major"
                    placeholder="Enter Your Major"
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!state.contract}
            >
              Edit Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDoctorDetails;
