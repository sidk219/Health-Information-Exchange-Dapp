pragma solidity ^0.8.18;

contract Record {
    struct Patient {
        string ic;
        string name;
        string phone;
        string gender;
        string dob;
        string height;
        string weight;
        string houseaddr;
        address addr;
        uint date;
    }

    struct Medications {
        string bloodgroup;
        string allergies;
        string medication;
    }

    struct Doctor {
        string ic;
        string name;
        string phone;
        string gender;
        string dob;
        string qualification;
        string major;
        address addr;
        uint date;
    }

    struct Appointment {
        address doctorAddr;
        address patientAddr;
        string date;
        string time;
        string prescription;
        string description;
        string diagnosis;
        string status;
        uint creationDate;
    }

    struct Permission {
        bool granted;
    }

    address public owner;
    address[] public patients;
    address[] public doctors;
    address[] public appointments;

    mapping(address => Patient) public patientDetails;
    mapping(address => Medications) public patientMedications;
    mapping(address => Doctor) public doctorDetails;
    mapping(address => Appointment) public appointmentDetails;

    mapping(address => mapping(address => Permission)) public permissions;
    mapping(address => bool) isPatient;
    mapping(address => bool) isDoctor;
    mapping(address => uint) AppointmentPerPatient;

    uint256 public patientCount;
    uint256 public doctorCount;
    uint256 public appointmentCountTotal;
    uint256 public permissionGrantedCount;

    constructor() {
        owner = msg.sender;
    }

    function setPatientDetails(
        string memory _ic,
        string memory _name,
        string memory _phone,
        string memory _gender,
        string memory _dob,
        string memory _height,
        string memory _weight,
        string memory _houseaddr
    ) public {
        // require(patientDetails[msg.sender].date == 0, "Patient details already set.");
        require(!isPatient[msg.sender], "Patient details already exists");

        Patient storage patient = patientDetails[msg.sender];
        patient.ic = _ic;
        patient.name = _name;
        patient.phone = _phone;
        patient.gender = _gender;
        patient.dob = _dob;
        patient.height = _height;
        patient.weight = _weight;
        patient.houseaddr = _houseaddr;
        patient.addr = msg.sender;
        patient.date = block.timestamp;

        patients.push(msg.sender);
        isPatient[msg.sender] = true;
        permissions[msg.sender][msg.sender].granted = true;
        patientCount++;
    }

    function setMedications(
        string memory _bloodgroup,
        string memory _allergies,
        string memory _medication
    ) public {
        require(isPatient[msg.sender], "Patient details not found");

        Medications storage medications = patientMedications[msg.sender];
        medications.bloodgroup = _bloodgroup;
        medications.allergies = _allergies;
        medications.medication = _medication;
    }

    function editPatientDetails(
        string memory _ic,
        string memory _name,
        string memory _phone,
        string memory _gender,
        string memory _dob,
        string memory _height,
        string memory _weight,
        string memory _houseaddr
    ) public {
        require(isPatient[msg.sender]);
        Patient storage p = patientDetails[msg.sender];

        p.ic = _ic;
        p.name = _name;
        p.phone = _phone;
        p.gender = _gender;
        p.dob = _dob;
        p.height = _height;
        p.weight = _weight;
        p.houseaddr = _houseaddr;
        p.addr = msg.sender;
    }

    function setDoctorDetails(
        string memory _ic,
        string memory _name,
        string memory _phone,
        string memory _gender,
        string memory _dob,
        string memory _qualification,
        string memory _major
    ) public {
        // require(doctorDetails[msg.sender].date == 0, "Doctor details already set.");
        require(!isDoctor[msg.sender]);

        Doctor storage doctor = doctorDetails[msg.sender];
        doctor.ic = _ic;
        doctor.name = _name;
        doctor.phone = _phone;
        doctor.gender = _gender;
        doctor.dob = _dob;
        doctor.qualification = _qualification;
        doctor.major = _major;
        doctor.addr = msg.sender;
        doctor.date = block.timestamp;

        doctors.push(msg.sender);
        isDoctor[msg.sender] = true;
        doctorCount++;
    }

    function editDoctor(
        string memory _ic,
        string memory _name,
        string memory _phone,
        string memory _gender,
        string memory _dob,
        string memory _qualification,
        string memory _major
    ) public {
        require(isDoctor[msg.sender]);
        Doctor storage d = doctorDetails[msg.sender];

        d.ic = _ic;
        d.name = _name;
        d.phone = _phone;
        d.gender = _gender;
        d.dob = _dob;
        d.qualification = _qualification;
        d.major = _major;
        d.addr = msg.sender;
    }

    function createAppointment(
        address _addr,
        string memory _date,
        string memory _time,
        string memory _prescription,
        string memory _description,
        string memory _diagnosis,
        string memory _status
    ) public {
        // require(patientDetails[msg.sender].date != 0, "Patient details not found.");
        // require(doctorDetails[_doctorAddr].date != 0, "Doctor details not found.");
        require(isDoctor[msg.sender]);

        Appointment storage appointment = appointmentDetails[msg.sender];
        appointment.doctorAddr = msg.sender;
        appointment.patientAddr = _addr;
        appointment.date = _date;
        appointment.time = _time;
        appointment.prescription = _prescription;
        appointment.description = _description;
        appointment.diagnosis = _diagnosis;
        appointment.status = _status;
        appointment.creationDate = block.timestamp;

        appointments.push(_addr);
        appointmentCountTotal++;
        AppointmentPerPatient[_addr]++;
    }

    function updateAppointment(
        address _addr,
        string memory _date,
        string memory _time,
        string memory _prescription,
        string memory _description,
        string memory _diagnosis,
        string memory _status
    ) public {
        require(isDoctor[msg.sender]);
        Appointment storage a = appointmentDetails[_addr];

        a.doctorAddr = msg.sender;
        a.patientAddr = _addr;
        a.date = _date;
        a.time = _time;
        a.diagnosis = _diagnosis;
        a.prescription = _prescription;
        a.description = _description;
        a.status = _status;
    }

    function grantPermission(address _doctorAddr) public {
        require(
            patientDetails[msg.sender].date != 0,
            "Patient details not found."
        );
        require(
            doctorDetails[_doctorAddr].date != 0,
            "Doctor details not found."
        );

        permissions[msg.sender][_doctorAddr].granted = true;
        permissionGrantedCount++;
    }

    function revokePermission(address _doctorAddr) public {
        require(
            patientDetails[msg.sender].date != 0,
            "Patient details not found."
        );
        require(
            doctorDetails[_doctorAddr].date != 0,
            "Doctor details not found."
        );

        permissions[msg.sender][_doctorAddr].granted = false;
        permissionGrantedCount--;
    }

    function getPatientCount() public view returns (uint256) {
        return patientCount;
    }

    function getDoctorCount() public view returns (uint256) {
        return doctorCount;
    }

    function getAppointmentCountTotal() public view returns (uint256) {
        return appointmentCountTotal;
    }

    function getPermissionGrantedCount() public view returns (uint256) {
        return permissionGrantedCount;
    }

    // function getPatientDetails(address _patientAddr) public view returns (Patient memory) {
    //     return patientDetails[_patientAddr];
    // }
    function getPatientDetails(
        address _patientAddr
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        require(
            patientDetails[_patientAddr].date != 0,
            "Patient details not found."
        );

        Patient memory patient = patientDetails[_patientAddr];
        return (
            patient.ic,
            patient.name,
            patient.phone,
            patient.gender,
            patient.dob,
            patient.height,
            patient.weight,
            patient.houseaddr,
            patient.date
        );
    }

    function getPatientMedications(
        address _patientAddr
    ) public view returns (string memory, string memory, string memory) {
        Medications memory m = patientMedications[_patientAddr];

        return (m.bloodgroup, m.allergies, m.medication);
    }

    function getDoctorDetails(
        address _doctorAddr
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        require(
            doctorDetails[_doctorAddr].date != 0,
            "Doctor details not found."
        );

        Doctor memory doctor = doctorDetails[_doctorAddr];
        return (
            doctor.ic,
            doctor.name,
            doctor.phone,
            doctor.gender,
            doctor.dob,
            doctor.qualification,
            doctor.date
        );
    }

    // function getDoctorDetails(address _doctorAddr) public view returns (Doctor memory) {
    //     return doctorDetails[_doctorAddr];
    // }

    function getAppointmentDetails(
        address _patientAddr
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        require(
            appointmentDetails[_patientAddr].creationDate != 0,
            "Appointment details not found."
        );

        Appointment memory appointment = appointmentDetails[_patientAddr];
        return (
            doctorDetails[appointment.doctorAddr].name,
            appointment.date,
            appointment.time,
            appointment.prescription,
            appointment.description,
            appointment.diagnosis,
            appointment.status,
            appointment.creationDate
        );
    }

    function getAllPatients() public view returns (address[] memory) {
        return patients;
    }

    function getAllDoctors() public view returns (address[] memory) {
        return doctors;
    }

    function getAllAppointments() public view returns (address[] memory) {
        return appointments;
    }

    function hasAccess(
        address _patientAddr,
        address _doctorAddr
    ) public view returns (bool) {
        return permissions[_patientAddr][_doctorAddr].granted;
    }
}
// function getAppointmentDetails(address _patientAddr) public view returns (Appointment memory) {
//     return appointmentDetails[_patientAddr];
// }

// function searchPatientDemographic(address _address) public view returns(string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
//     require(permissions[_address][msg.sender].granted);

//     Patient memory p = patientDetails[_address];

//     return (p.ic, p.name, p.phone, p.gender, p.dob, p.height, p.weight);
// }

// //Search patient details by entering a patient address (Only record owner or doctor with permission will be allowed to access)
// function searchPatientMedical(address _address) public view returns(string memory, string memory, string memory, string memory) {
//     require(permissions[_address][msg.sender].granted);

//     Patient memory p = patientDetails[_address];
//     Medications memory m=patientMedications[_address];

//     return (p.houseaddr, m.bloodgroup,m.allergies, m.medication);
// }

// //Search doctor details by entering a doctor address (Only doctor will be allowed to access)
// function searchDoctor(address _address) public view returns(string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
//     require(isDoctor[_address]);

//     Doctor memory d = doctorDetails[_address];

//     return (d.ic, d.name, d.phone, d.gender, d.dob, d.qualification, d.major);
// }

// //Search appointment details by entering a patient address
// function searchAppointment(address _address) public view returns(address, string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
//     Appointment memory a = appointmentDetails[_address];
//     Doctor memory d = doctorDetails[a.doctorAddr];

//     return (a.doctorAddr, d.name, a.date, a.time, a.diagnosis, a.prescription, a.description, a.status);
// }

// //Search patient record creation date by entering a patient address
// function searchRecordDate(address _address) public view returns(uint) {
//     Patient memory p = patientDetails[_address];

//     return (p.date);
// }

// //Search doctor profile creation date by entering a patient address
// function searchDoctorDate(address _address) public view returns(uint) {
//     Doctor memory d = doctorDetails[_address];

//     return (d.date);
// }

// //Search appointment creation date by entering a patient address
// function searchAppointmentDate(address _address) public view returns(uint) {
//     Appointment memory a = appointmentd[_address];

//     return (a.creationDate);
// }
