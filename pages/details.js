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
        var records;
        var appointment;

        try {
            records = await record.methods.searchPatient(addr).call({from: accounts[0]});
            appointment = await record.methods.searchAppointment(addr).call({from: accounts[0]});  
            
            return {
                ic: records[0],
                name: records[1],
                phone: records[2],
                gender: records[3],
                dob: records[4],
                bloodgroup: records[5],
                medication: records[6],

                doctoraddr : appointment[0],
                date: appointment[1],
                time: appointment[2],
                diagnosis: appointment[3],
                prescription: appointment[4],
                description: appointment[5],
                status: appointment[6]
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
            <Segment inverted color='blue'>
                 <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Patient Medical Record</h2>
                <Segment>
                    <h3>IC: {this.props.ic}</h3>
                    <h3>Name: {this.props.name}</h3>
                    <h3>Phone: {this.props.phone}</h3>
                    <h3>Gender: {this.props.gender}</h3>
                    <h3>Date of Birth: {this.props.dob}</h3>
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