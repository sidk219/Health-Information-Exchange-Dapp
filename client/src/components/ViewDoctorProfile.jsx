import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../App.css";
import { BeatLoader } from "react-spinners";

const ViewDoctorProfile = ({ state, accounts, setAccount }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { contract } = state;

  useEffect(() => {
    const fetchDoctor = async () => {
      const ethAccounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(ethAccounts[0]);
      setAccount(account);
      const allDoctors = await contract.getAllDoctors();
      // const allPatients = await contract.getAllPatients();
      // Check if the doctor's address is present in the list of doctors
      if (!allDoctors.includes(account)) {
        console.log("You are not registered as a doctor");
        window.alert("You are not registered as a doctor");
        return;
      }
      const [ic, name, phone, gender, dob, qualification, date] =
        await contract.getDoctorDetails(account);

      console.log(
        "Doctor Details:",
        account,
        ic,
        name,
        phone,
        gender,
        dob,
        qualification,
        date
      );
      const dateValue = date !== undefined ? date.toNumber() : null;

      // Set the doctor details in state
      setDoctor({
        account,
        ic,
        name,
        phone,
        gender,
        dob,
        qualification,
        date: dateValue,
      });
      setLoading(false);
    };

    contract && fetchDoctor();
  }, [contract]);

  let account = null;
  if (accounts && accounts.length > 0) {
    account = accounts[0];
  }

  return (
    <div>
      <h1>View Doctor Details</h1>
      {loading ? (
        <div className="loading-container">
          <BeatLoader color="#000000" loading={loading} />
          <p>Loading doctor details...</p>
        </div>
      ) : doctor !== null ? (
        <div className="view-doctor-container">
          <table className="details-table">
            <tbody>
              <tr>
                <td>Doctor Address</td>
                <td>{doctor.account}</td>
              </tr>
              <tr>
                <td>IC</td>
                <td>{doctor.ic}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{doctor.name}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{doctor.phone}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{doctor.gender}</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>{doctor.dob}</td>
              </tr>
              <tr>
                <td>Qualification</td>
                <td>{doctor.qualification}</td>
              </tr>
              {doctor.date !== null && (
                <tr>
                  <td>Registered on</td>
                  <td>{new Date(doctor.date * 1000).toLocaleString()}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No doctor details available.</p>
      )}
    </div>
  );
};

export default ViewDoctorProfile;

// import { useState, useEffect } from "react";
// import { ethers } from "ethers";

// const ViewDoctorProfile = ({ state, accounts, setAccount }) => {
//   const [doctor, setDoctor] = useState([]);
//   const { contract } = state;

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       // Call the getAllPatients function to retrieve the list of patient addresses
//       accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       const account = ethers.utils.getAddress(accounts[0]);
//       setAccount(account);
//       const [ic, name, phone, gender, dob, qualification, major, date] =
//         await contract.getDoctorDetails(account); // Replace `account` with the actual doctor's address

//       // Inside the useEffect hook
//       console.log(
//         "Doctor Details:",
//         ic,
//         name,
//         phone,
//         gender,
//         dob,
//         qualification,
//         major,
//         date
//       );

//       // Set the doctor details in state
//       setDoctor({
//         ic,
//         name,
//         phone,
//         gender,
//         dob,
//         qualification,
//         major,
//         date,
//       });
//     };

//     contract && fetchDoctor();
//   }, [contract]);

//   return (
//     <div>
//       <h1>View Doctor Details</h1>
//       {doctor && (
//         <div>
//           <h3>Doctor Address: {account}</h3>
//           <p>IC: {doctor.ic}</p>
//           <p>Name: {doctor.name}</p>
//           <p>Phone: {doctor.phone}</p>
//           <p>Gender: {doctor.gender}</p>
//           <p>Date of Birth: {doctor.dob}</p>
//           <p>Qualification: {doctor.qualification}</p>
//           <p>Major: {doctor.major}</p>
//           <p>Date: {new Date(doctor.date * 1000).toLocaleString()}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewDoctorProfile;
