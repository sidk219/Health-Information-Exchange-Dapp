import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BeatLoader } from "react-spinners";

const ViewPatientRecords = ({ state, accounts, setAccount }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientRecord, setSelectedPatientRecord] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { contract } = state;

  useEffect(() => {
    const fetchPatients = async () => {
      // Call the getAllPatients function to retrieve the list of patient addresses
      const patientAddresses = await contract.getAllPatients();

      // Fetch patient details for each address
      const fetchedPatients = await Promise.all(
        patientAddresses.map(async (address) => {
          // Call the getPatientDetails function to retrieve patient details
          const [
            ic,
            name,
            phone,
            gender,
            dob,
            height,
            weight,
            houseaddr,
            date,
          ] = await contract.getPatientDetails(address);
          const [bloodGroup, allergies, medications] =
            await contract.getPatientMedications(address);

          return {
            address,
            ic,
            name,
            phone,
            gender,
            dob,
            height,
            weight,
            houseaddr,
            date,
            bloodGroup,
            allergies,
            medications,
          };
        })
      );
      setPatients(fetchedPatients);
      setLoading(false);
    };

    contract && fetchPatients();
  }, [contract]);

  const handleViewRecord = async (address) => {
    accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
    const hasAccess = await contract.hasAccess(address, accounts[0]);

    if (!hasAccess) {
      // If the user does not have access, show an alert and return
      alert("You do not have access to view this record");
      return;
    }
    const patientRecord = patients.find(
      (patient) => patient.address === address
    );
    setSelectedPatient(address);
    setSelectedPatientRecord(patientRecord);

    try {
      const [
        doctorName,
        date,
        time,
        prescription,
        description,
        diagnosis,
        status,
        creationDate,
      ] = await contract.getAppointmentDetails(address);

      const appointment = {
        doctorName,
        date,
        time,
        prescription,
        description,
        diagnosis,
        status,
        creationDate,
      };

      setSelectedAppointment(appointment);
    } catch (error) {
      // Handle the case where appointment details are not found for the patient
      setSelectedAppointment(null);
    }
  };

  const handleCloseRecord = () => {
    setSelectedPatient(null);
    setSelectedPatientRecord(null);
    setSelectedAppointment(null);
  };

  return (
    <div>
      <h1>View Patient Records</h1>
      {loading ? (
        <div className="loading-container">
          <BeatLoader color="#000000" loading={loading} />
          <p>Loading patient records...</p>
        </div>
      ) : selectedPatient ? (
        <div>
          <h3>Patient Address: {selectedPatient}</h3>
          {selectedPatientRecord && (
            <div className="view-doctor-container">
              <table className="details-table">
                <tbody>
                  <tr>
                    <td>IC</td>
                    <td>{selectedPatientRecord.ic}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{selectedPatientRecord.name}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{selectedPatientRecord.phone}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{selectedPatientRecord.gender}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth</td>
                    <td>{selectedPatientRecord.dob}</td>
                  </tr>
                  <tr>
                    <td>Height</td>
                    <td>{selectedPatientRecord.height}</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{selectedPatientRecord.weight}</td>
                  </tr>
                  <tr>
                    <td>House Address</td>
                    <td>{selectedPatientRecord.houseaddr}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>
                      {new Date(
                        selectedPatientRecord.date * 1000
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>Blood Group</td>
                    <td>{selectedPatientRecord.bloodGroup}</td>
                  </tr>
                  <tr>
                    <td>Allergies</td>
                    <td>{selectedPatientRecord.allergies}</td>
                  </tr>
                  <tr>
                    <td>Medications</td>
                    <td>{selectedPatientRecord.medications}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {selectedAppointment ? (
            <div>
              <h3>Appointment Details</h3>
              <div className="view-doctor-container">
                <table className="details-table">
                  <tbody>
                    <tr>
                      <td>Doctor</td>
                      <td>{selectedAppointment.doctorName}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td>{selectedAppointment.date}</td>
                    </tr>
                    <tr>
                      <td>Time</td>
                      <td>{selectedAppointment.time}</td>
                    </tr>
                    <tr>
                      <td>Prescription</td>
                      <td>{selectedAppointment.prescription}</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>{selectedAppointment.description}</td>
                    </tr>
                    <tr>
                      <td>Diagnosis</td>
                      <td>{selectedAppointment.diagnosis}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>{selectedAppointment.status}</td>
                    </tr>
                    <tr>
                      <td>Creation Date</td>
                      <td>
                        {new Date(
                          selectedAppointment.creationDate * 1000
                        ).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <p>
                <strong>No appointment found for this patient.</strong>
              </p>
              <h3>Appointment Details</h3>
              <div className="view-doctor-container">
                <table className="details-table">
                  <tbody>
                    <tr>
                      <td>Doctor</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Time</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Prescription</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Diagnosis</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Creation Date</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <button className="access-button" onClick={handleCloseRecord}>
            Close Record
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.address}>
                  <td>{patient.address}</td>
                  <td>
                    <button
                      className="view-record-button"
                      onClick={() => handleViewRecord(patient.address)}
                    >
                      View Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewPatientRecords;
