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

        try {
            records = await record.methods.searchPatient(addr).call({from: accounts[0]}); 

            return {
                ic: records[0],
                name: records[1],
                phone: records[2],
                gender: records[3],
                dob: records[4],
                bloodgroup: records[5],
                allergies: records[6]
            };
        }
        catch (err) {
            alert("You don't have permission to view this account");
            Router.pushRoute('/list');
        }
    }

    renderDisplay() {
        return(
            <Segment inverted color='blue'>
                 <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Patient Medical Record</h2>
                <Segment>
                    <h3>IC: {this.props.ic}</h3>
                    <h3>Name: {this.props.name}</h3>
                    <h3>Phone: {this.props.phone}</h3>
                    <h3>Gender: {this.props.gender}</h3>
                    <h3>Date of Birth: {this.props.dob}</h3>
                    <h3>Blood Group: {this.props.bloodgroup}</h3>
                    <h3>Allergies: {this.props.allergies}</h3>
                </Segment>
            </Segment>
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