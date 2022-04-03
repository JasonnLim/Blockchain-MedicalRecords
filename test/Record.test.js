const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledRecord = require('../ethereum/build/Record.json');

let accounts;
let record;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    record = await new web3.eth.Contract(JSON.parse(compiledRecord.interface))
        .deploy({ data: compiledRecord.bytecode })
        .send({ from: accounts[0], gas: '5000000' });
});

describe('Records', () => {
    it('can deploy record contract', () => {
        assert.ok(record.options.address);
    });

    it('can add record', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','O', 'Flu'
        ).send({ from: accounts[0], gas: '5000000' });
    });

    it('can retrieve all record address', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','O', 'Flu'
        ).send({ from: accounts[0], gas: '5000000' });

        const allRecords = await record.methods.getPatients().call();

        const owner = await record.methods.owner().call();

        assert.equal(allRecords, owner);
    });

    it('can search for a patient', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','O', 'Flu'
        ).send({ from: accounts[0], gas: '5000000' });
        
        const owner = await record.methods.owner().call();
        console.log(owner);

        names = await record.methods.searchPatient(owner).call();

        console.log(names[0]);
    });

    it('can create patient using multiple accounts', async () => {
        await record.methods.setDetails(
            '001107020345', 'Josn', '0123456789', 'Male', '07/22/2222','O', 'Flu'
        ).send({ from: accounts[0], gas: '5000000' });

        await record.methods.setDetails(
            '001107020345', 'Johssean', '0123456789', 'Male', '07/22/2222','O', 'Flu'
        ).send({ from: accounts[1], gas: '5000000' });
        
        const allRecords = await record.methods.getPatients().call();
        console.log(allRecords);

        console.log(accounts[0])
        console.log(accounts[1])
    });

    it('can create appointment using doctor account', async () => {
        await record.methods.setDetails(
            '001107020345', 'Josn', '0123456789', 'Male', '07/22/2222','Doctorate', 'Virology'
        ).send({ from: accounts[0], gas: '5000000' });

        await record.methods.setDoctor(
            '001107020345', 'Josn', '0123456789', 'Male', '07/22/2222','Doctorate', 'Virology'
        ).send({ from: accounts[1], gas: '5000000' });

        await record.methods.setAppointment(
            accounts[0], '07/07/2022', '11:50pm', 'Amoxicillin', 'Requires observation','Skin Infection', 'Pending'
        ).send({ from: accounts[1], gas: '5000000' });
        
        var appointment = await record.methods.searchAppointment(accounts[0]).call({from: accounts[1]}); 

        console.log(appointment[0])
        console.log(appointment[6])
    });
    
    it('can count number of records created by patient', async () => {
        await record.methods.setDetails(
            '001107020345', 'Josn', '0123456789', 'Male', '07/22/2222','Doctorate', 'Virology'
        ).send({ from: accounts[0], gas: '5000000' });
        
        const patientCount = await record.methods.getPatientCount().call();
        assert.equal(patientCount, 1);
    });
});