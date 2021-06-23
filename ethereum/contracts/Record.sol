pragma solidity ^0.4.17;

contract Record {
    
    struct Patients{
        string name;
        string age;
        string phone;
        string diseases;
    }
    
    address public owner;
    address[] public patientList;
    mapping (address => Patients) patients;
    mapping(address => bool) isApproved;
    
    function Record() public {
        owner = msg.sender;
        isApproved[msg.sender] = true;
    }
    
    //Retrieve patient details from the form and save the details
    function setDetails(string _name, string _age, string _phone, string _diseases) public {
        var p = patients[owner];
        
        p.name = _name;
        p.age = _age;
        p.phone = _phone;
        p.diseases = _diseases;
        
        patientList.push(owner);
    }
    
    //Owner must give permission to doctor only they are allowed to view records
    function givePermission(address _address) public {
        isApproved[_address] = true;
    }
    
    //Retrieve a list of all patients address
    function getPatients() public view returns(address[]) {
        return patientList;
    }
    
    //Search patient details by entering a patient address (Only record owner or doctor with permission will be allowed to access)
    function searchPatient(address _address) public view returns(string, string, string, string) {
        require(isApproved[msg.sender] == true);
        return (patients[_address].name, patients[_address].age, patients[_address].phone, patients[_address].diseases);
    }
    
}