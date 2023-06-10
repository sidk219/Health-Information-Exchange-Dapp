import abi from "./contracts/Record.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPatient from "./components/RegisterPatient";
import HomePage from "./components/HomePage";
import ViewPatientRecords from "./components/ViewPatientRecords";
import EditPatientProfile from "./components/EditPatientProfile";
import GrantAccess from "./components/GrantAccess";
import RegisterDoctor from "./components/RegisterDoctor";
import ViewDoctorProfile from "./components/ViewDoctorProfile";
import EditDoctorDetails from "./components/EditDoctorDetails";
import UpdateAppointment from "./components/UpdateAppointment";
import CreateAppointment from "./components/CreateAppointment";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x383E8910Cd35E98F24040E108ab4572C0414a41c";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar account={account} setAccount={setAccount} />
        <Routes>
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route
            path="/"
            element={<HomePage account={account} setAccount={setAccount} />}
          />
          <Route
            path="/registerPatient"
            element={
              <RegisterPatient
                state={state}
                account={account}
                setAccount={setAccount}
              />
            }
          />
          <Route
            path="/registerDoctor"
            element={
              <RegisterDoctor
                state={state}
                account={account}
                setAccount={setAccount}
              />
            }
          />
          <Route
            path="/viewPatientRecords"
            element={
              <ViewPatientRecords
                state={state}
                account={account}
                setAccount={setAccount}
              />
            }
          />
          <Route
            path="/viewDoctorProfile"
            element={
              <ViewDoctorProfile
                state={state}
                account={account}
                setAccount={setAccount}
              />
            }
          />
          <Route
            path="/editPatientProfile"
            element={
              <EditPatientProfile
                state={state}
                account={account}
                setAccount={setAccount}
              />
            }
          />
          <Route
            path="/editDoctorDetails"
            element={
              <EditDoctorDetails
                state={state}
                account={account}
                setAccount={setAccount}
              />
            }
          />
          <Route
            path="/createAppointment"
            element={
              <CreateAppointment
                state={state}
                account={account}
                setAccount={setAccount}
              />
            }
          />
          <Route
            path="/updateAppointment"
            element={
              <UpdateAppointment
                state={state}
                account={account}
                setAccount={setAccount}
              />
            }
          />
          <Route
            path="/grantAccess"
            element={
              <GrantAccess
                state={state}
                account={account}
                setAccount={setAccount}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
