import React, { Component } from 'react';
import { Segment, Input, Header, Message, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class RecordDetails extends Component {

    static async getInitialProps(props) {
        const addr = props.query.address;
        const accounts = await web3.eth.getAccounts();
        var records, records2, appointment;

        try {
            records = await record.methods.searchPatientDemographic(addr).call({from: accounts[0]});
            records2 = await record.methods.searchPatientMedical(addr).call({from: accounts[0]});
            appointment = await record.methods.searchAppointment(addr).call({from: accounts[0]});  
            
            return {
                ic: records[0],
                name: records[1],
                phone: records[2],
                gender: records[3],
                dob: records[4],
                height: records[5],
                weight: records[6],
                
                houseaddr: records2[0],
                bloodgroup: records2[1],
                medication: records2[2],
                emergencyName: records2[3],
                emergencyContact: records2[4],

                doctoraddr: appointment[0],
                doctorname: appointment[1],
                date: appointment[2],
                time: appointment[3],
                diagnosis: appointment[4],
                prescription: appointment[5],
                description: appointment[6],
                status: appointment[7]
            };
        }
        catch (err) {
            alert("You don't have permission to view this account");
            Router.pushRoute('/list');
        }
    }

    renderDisplay() {
        return(
            <div>
                <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Patient Medical Record</h2>
                <Segment inverted tertiary color='teal'>
                    <Segment>
                        <h3>IC: {this.props.ic}</h3>
                        <h3>Name: {this.props.name}</h3>
                        <h3>Phone: {this.props.phone}</h3>
                        <h3>Gender: {this.props.gender}</h3>
                        <h3>Date of Birth: {this.props.dob}</h3>
                        <h3>Height: {this.props.height}</h3>
                        <h3>Weight: {this.props.weight}</h3>
                        <h3>Blood Group: {this.props.bloodgroup}</h3>
                        <h3>Current Medications: {this.props.medication}</h3>
                    </Segment>
                </Segment>
                
                <Segment inverted color='blue'>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Appointments</h2>
                    <Segment>
                        <h3>Doctor Address: {this.props.doctoraddr}</h3>
                        <h3>Date: {this.props.date}</h3>
                        <h3>Time: {this.props.time}</h3>
                        <h3>Diagnosis: {this.props.diagnosis}</h3>
                        <h3>Prescription: {this.props.prescription}</h3>
                        <h3>Description: {this.props.description}</h3>
                        <h3>Status: {this.props.status}</h3>
                    </Segment>
                </Segment>
            </div>
        );
    }

    render() {
        return (
            <Layout>
                <div>
                    {this.renderDisplay()}
                </div>
            </Layout>
        );
    }
}

export default RecordDetails;