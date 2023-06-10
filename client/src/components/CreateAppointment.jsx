import React from "react";
import { ethers } from "ethers";

const CreateAppointment = ({ state, accounts, setAccount }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const patientAddr = document.getElementById("patientAddr").value;
    const dateAppt = document.getElementById("dateAppt").value;
    const timeAppt = document.getElementById("timeAppt").value;
    const prescription = document.getElementById("prescription").value;
    const description = document.getElementById("description").value;
    const diagnosis = document.getElementById("diagnosis").value;
    const status = document.getElementById("status").value;
    accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
    try {
      const allDoctors = await contract.getAllDoctors();
      const allPatients = await contract.getAllPatients();
      // Check if the doctor's address is present in the list of doctors
      if (!allDoctors.includes(account)) {
        console.log("Only doctors can create appointments.");
        window.alert("Only doctors can create appointments.");
        return;
      }

      if (!allPatients.includes(patientAddr)) {
        window.alert("Invalid patient's address.");
        console.log("Invalid patient's address.");
        return;
      }
      const createApptTransaction = await contract.createAppointment(
        patientAddr,
        dateAppt,
        timeAppt,
        prescription,
        description,
        diagnosis,
        status
      );
      await createApptTransaction.wait();
      console.log("Form submitted successfully!");
      console.log("Appointment created successfully!");
      console.log(`Doctor's Address: ${account}`);
      console.log(`Patient's Address: ${patientAddr}`);
      console.log(`Time: ${timeAppt}`);
      console.log(`Date: ${dateAppt}`);
      console.log(`Prescription: ${prescription}`);
      console.log(`Description: ${description}`);
      console.log(`Diagnosis: ${diagnosis}`);
      console.log(`Status: ${status}`);
    } catch (error) {
      console.error("Error:", error);
    }

    event.target.reset();
  };
  return (
    <div>
      <h1>Add Report</h1>
      <div className="box">
        <div className="container-md">
          <h2>Enter Report Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="section">
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Patient's Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="patientAddr"
                    placeholder="Patient's Ethereum Address"
                    pattern="^0x[0-9a-fA-F]{40}$"
                    title="Enter correct address"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Date of Appointment</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateAppt"
                    placeholder="Enter Appointment Date"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    id="timeAppt"
                    placeholder="Enter appointment time"
                    pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
                    title="Enter a valid time in the 24-hour format (hh:mm)"
                    required
                  />
                  <br></br>
                  <br></br>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Prescription</label>
                  <textarea
                    className="form-control"
                    id="prescription"
                    placeholder="Enter Prescription"
                    rows={5}
                    cols={40}
                    style={{ width: "50%" }}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Enter Description"
                    rows={4}
                    cols={40}
                    style={{ width: "50%" }}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Diagnosis</label>
                  <textarea
                    className="form-control"
                    id="diagnosis"
                    placeholder="Enter Diagnosis"
                    rows={4}
                    cols={40}
                    style={{ width: "50%" }}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    id="status"
                    placeholder="Select status"
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
              Create Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
