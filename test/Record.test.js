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
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });
    });

    it('can retrieve all record address', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });

        const allRecords = await record.methods.getPatients().call();

        const owner = await record.methods.owner().call();

        assert.equal(allRecords, owner);
    });

    it('can search for a patient', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });
        
        const owner = await record.methods.owner().call();

        names = await record.methods.searchPatientDemographic(owner).call();

        assert.equal(names[0], '001107020345');
    });

    it('can create patient using multiple accounts', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });

        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[1], gas: '5000000' });
        
        const allRecords = await record.methods.getPatients().call();

        assert.equal(allRecords[0], accounts[0]);
        assert.equal(allRecords[1], accounts[1]);
    });

    it('can create appointment using doctor account', async () => {
        await record.methods.setDetails(
            '001107020345', 'Bane Gateson', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smooth', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });

        await record.methods.setDoctor(
            '001107020345', 'Josn', '0123456789', 'Male', '07/22/2222','Doctorate', 'Virology'
        ).send({ from: accounts[1], gas: '5000000' });

        await record.methods.setAppointment(
            accounts[0], '07/07/2022', '11:50pm', 'Amoxicillin', 'Requires observation','Skin Infection', 'Pending'
        ).send({ from: accounts[1], gas: '5000000' });
        
        var appointment = await record.methods.searchAppointment(accounts[0]).call({from: accounts[1]}); 

        assert.notEqual(appointment[0], null);
    });
    
    it('can count number of records created by patient', async () => {
        await record.methods.setDetails(
            '001107020345', 'John', '0123456789', 'Male', '07/22/2222','183', '75', '1234, Jalan Sekysen 1/3, 31900 Kampar, Perak.', 'O', 'Food', 'Antidepressants', 'Taylor Smith', '0128993344'
        ).send({ from: accounts[0], gas: '5000000' });
        
        const patientCount = await record.methods.getPatientCount().call();
        assert.equal(patientCount, 1);
    });
});