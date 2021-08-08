pragma solidity ^0.4.17;

contract Record {
    
    struct Patients{
        string ic;
        string name;
        string phone;
        string gender;
        string dob;
        string bloodgroup;
        string allergies;
        address addr;
    }
    
    address public owner;
    address[] public patientList;
    mapping(address => Patients) patients;
    mapping(address=>mapping(address=>bool)) isApproved;
    mapping(address => bool) isPatient;
    
    function Record() public {
        owner = msg.sender;
    }
    
    //Retrieve patient details from the form and save the details
    function setDetails(string _ic, string _name, string _phone, string _gender, string _dob, string _bloodgroup, string _allergies) public {
        require(!isPatient[msg.sender]);
        var p = patients[msg.sender];
        
        p.ic = _ic;
        p.name = _name;
        p.phone = _phone;
        p.gender = _gender;
        p.dob = _dob;
        p.bloodgroup = _bloodgroup;
        p.allergies = _allergies;
        p.addr = msg.sender;
        
        patientList.push(msg.sender);
        isPatient[msg.sender] = true;
        isApproved[msg.sender][msg.sender] = true;
    }
    
    //Owner must give permission to doctor only they are allowed to view records
    function givePermission(address _address) public returns(bool success) {
        isApproved[msg.sender][_address] = true;
        return true;
    }
    
    //Retrieve a list of all patients address
    function getPatients() public view returns(address[]) {
        return patientList;
    }
    
    //Search patient details by entering a patient address (Only record owner or doctor with permission will be allowed to access)
    function searchPatient(address _address) public view returns(string, string, string, string, string, string, string) {
        require(isApproved[_address][msg.sender]);
        
        var p = patients[_address];
        
        return (p.ic, p.name, p.phone, p.gender, p.dob, p.bloodgroup, p.allergies);
    }
    
}