import React, { useState } from "react";
import { ethers } from "ethers";

const GrantAccess = ({ state, accounts, setAccount }) => {
  const [doctorAddress, setDoctorAddress] = useState("");
  const { contract } = state;

  const handleGrantAccess = async () => {
    accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account); // Assuming the current user is the patient

    try {
      const allDoctors = await contract.getAllDoctors();
      const allPatients = await contract.getAllPatients();
      if (!allDoctors.includes(doctorAddress)) {
        console.error("No doctor registered by that address");
        window.alert("No doctor registered by that address");
        return;
      }
      if (!allPatients.includes(account)) {
        console.error("You have to register to use this function");
        window.alert("You have to register to use this function");
        return;
      }

      if (account === doctorAddress) {
        console.error("Doctors cannot grant/revoke access from themselves.");
        window.alert("Doctors cannot grant access to themselves.");
        return;
      }
      const grantTransaction = await contract.grantPermission(doctorAddress);
      await grantTransaction.wait();
      console.log("Access granted to doctor:", doctorAddress);
    } catch (error) {
      console.error("Failed to grant access:", error);
    }
  };

  const handleRevokeAccess = async () => {
    accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account); // Assuming the current user is the patient

    try {
      const allDoctors = await contract.getAllDoctors();
      const allPatients = await contract.getAllPatients();
      if (!allDoctors.includes(doctorAddress)) {
        console.log("No doctor registered by that address");
        window.alert("No doctor registered by that address");
        return;
      }
      if (!allPatients.includes(account)) {
        console.log("You have to register to use this function");
        window.alert("You have to register to use this function");
        return;
      }
      if (account === doctorAddress) {
        console.error("Doctors cannot revoke access from themselves.");
        window.alert("Doctors cannot revoke access from themselves.");
        return;
      }
      const revokeTransaction = await contract.revokePermission(doctorAddress);
      await revokeTransaction.wait();
      console.log("Access revoked for doctor:", doctorAddress);
    } catch (error) {
      console.error("Failed to revoke access:", error);
    }
  };

  return (
    <div className="box">
      <div className="container-md">
        <div className="section">
          <div className="mb-3">
            <h2>Grant/Revoke Access</h2>
            <div className="form-group">
              <label className="form-label">Doctor's Address</label>
              <input
                type="text"
                value={doctorAddress}
                onChange={(e) => setDoctorAddress(e.target.value)}
                placeholder="Doctor Address"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <button
            onClick={handleGrantAccess}
            className="access-button"
            disabled={!state.contract}
          >
            Grant Access
          </button>
          <button
            onClick={handleRevokeAccess}
            className="access-button"
            disabled={!state.contract}
          >
            Revoke Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrantAccess;

// import { useState } from "react";
// import { ethers } from "ethers";

// const GrantAccess = ({ state, accounts, setAccount }) => {
//   const [patientAddress, setPatientAddress] = useState("");
//   const [doctorAddress, setDoctorAddress] = useState("");
//   const [grantResult, setGrantResult] = useState("");
//   const [accessResult, setAccessResult] = useState("");
//   const [accessError, setAccessError] = useState("");

//   const { contract } = state;
//   const handleGrantPermission = async (e) => {
//     e.preventDefault();
//     accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//     const account = ethers.utils.getAddress(accounts[0]);

//     try {
//       await contract.grantPermission(doctorAddress, { from: account });
//       setGrantResult("Permission granted successfully");
//     } catch (error) {
//       setGrantResult("");
//       console.log("Error:", error);
//     }
//   };

//   const handleCheckAccess = async (e) => {
//     e.preventDefault();

//     try {
//       const hasAccess = await contract.hasAccess(patientAddress, doctorAddress);
//       setAccessResult(hasAccess ? "Access granted" : "Access denied");
//       setAccessError("");
//     } catch (error) {
//       setAccessResult("");
//       setAccessError("Error: " + error.message);
//     }
//   };

//   const handlePatientAddressChange = (e) => {
//     setPatientAddress(e.target.value);
//   };

//   const handleDoctorAddressChange = (e) => {
//     setDoctorAddress(e.target.value);
//   };

//   return (
//     <div>
//       {/* <h1>Manage Access to Patient Records</h1>
//       <form onSubmit={handleGrantPermission}>
//         <div>
//           <label>Patient Address:</label>
//           <input
//             type="text"
//             value={patientAddress}
//             onChange={handlePatientAddressChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Doctor Address:</label>
//           <input
//             type="text"
//             value={doctorAddress}
//             onChange={handleDoctorAddressChange}
//             required
//           />
//         </div>
//         <div>
//           <button type="submit">Grant Permission</button>
//         </div>
//       </form>
//       {grantResult && <p>{grantResult}</p>} */}
//       <h1>Manage Access to Patient Records</h1>
//       <form onSubmit={handleGrantPermission}>
//         <div>
//           <label>Patient Address:</label>
//           <p>{account}</p>
//         </div>
//         <div>
//           <label>Doctor Address:</label>
//           <input
//             type="text"
//             value={doctorAddress}
//             onChange={handleDoctorAddressChange}
//             required
//           />
//         </div>
//         <div>
//           <button type="submit">Grant Permission</button>
//         </div>
//       </form>
//       {grantResult && <p>{grantResult}</p>}

//       {/* <h2>Check Access to Patient Records</h2>
//       <form onSubmit={handleCheckAccess}>
//         <div>
//           <label>Patient Address:</label>
//           <input
//             type="text"
//             value={patientAddress}
//             onChange={handlePatientAddressChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Doctor Address:</label>
//           <input
//             type="text"
//             value={doctorAddress}
//             onChange={handleDoctorAddressChange}
//             required
//           />
//         </div>
//         <div>
//           <button type="submit">Check Access</button>
//         </div>
//       </form>
//       {accessResult && <p>{accessResult}</p>}
//       {accessError && <p>{accessError}</p>} */}
//     </div>
//   );
// };

// export default GrantAccess;
