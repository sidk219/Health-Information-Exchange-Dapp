import React from "react";
import { ethers } from "ethers";

const EditPatientProfile = ({ state, accounts, setAccount }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const ic = document.getElementById("ic").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dob = document.getElementById("dob").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const houseaddr = document.getElementById("houseaddr").value;
    const bloodgroup = document.getElementById("bloodgroup").value;
    const allergies = document.getElementById("allergies").value;
    const medications = document.getElementById("medications").value;
    accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
    try {
      const editTransaction = await contract.editPatientDetails(
        ic,
        name,
        phone,
        gender,
        dob,
        height,
        weight,
        houseaddr
      );
      await editTransaction.wait();

      const medicationsTransaction = await contract.setMedications(
        bloodgroup,
        allergies,
        medications
      );
      await medicationsTransaction.wait();
    } catch (error) {
      console.error("Error:", error);
    }

    event.target.reset();
    console.log("Form submitted successfully!");
    console.log("Edited Details successfully!");
    console.log(`IC: ${ic}`);
    console.log(`Full Name: ${name}`);
    console.log(`Phone no: ${phone}`);
    console.log(`Gender: ${gender}`);
    console.log(`DOB: ${dob}`);
    console.log(`Height: ${height}`);
    console.log(`Weight: ${weight}`);
    console.log(`Address: ${houseaddr}`);
    console.log(`Blood Group: ${bloodgroup}`);
    console.log(`Allergies: ${allergies}`);
    console.log(`Medications: ${medications}`);
  };
  return (
    <div>
      <h1>Edit Patient Details</h1>
      <div className="box">
        <div className="container-md">
          <h2>Patient details</h2>
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
                    pattern="[A-Za-z]{2}\d{6}[A-Za-z]{2}"
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
                  <label className="form-label">Height (in cm)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="height"
                    placeholder="Enter Your Height (in cm)"
                    pattern="[1-3][0-9]{0,2}"
                    required
                  />
                  <small className="form-text text-muted">Example: 170</small>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Weight (in kg)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="weight"
                    placeholder="Enter Your Weight (in kg)"
                    pattern="[1-9][0-9]{0,2}"
                    required
                  />
                  <small className="form-text text-muted">Example: 65</small>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">House Address</label>
                  <textarea
                    className="form-control"
                    id="houseaddr"
                    placeholder="Enter Your Home Address"
                    rows={3}
                    cols={40}
                    style={{ width: "50%" }}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <hr className="line" />

            <div className="section">
              <div className="mb-3">
                <h2>Medication</h2>
                <div className="form-group">
                  <label className="form-label" htmlFor="bloodGroup">
                    Blood Group
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bloodgroup"
                    placeholder="Enter Blood Group"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="allergies">
                    Allergies
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="allergies"
                    placeholder="Enter Allergies"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="medications">
                    Medications
                  </label>
                  <textarea
                    className="form-control"
                    id="medications"
                    placeholder="Enter Medications"
                    rows={3}
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!state.contract}
            >
              Save Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPatientProfile;
