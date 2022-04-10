import React, { Component } from 'react';
import { Segment, Input, Header, Message, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class DoctorDetails extends Component {

    static async getInitialProps(props) {
        const addr = props.query.address;
        const accounts = await web3.eth.getAccounts();
        var doctor;

        try {
            doctor = await record.methods.searchDoctor(addr).call({from: accounts[0]});
            
            return {
                ic: doctor[0],
                name: doctor[1],
                phone: doctor[2],
                gender: doctor[3],
                dob: doctor[4],
                qualification: doctor[5],
                major: doctor[6],
            };
        }
        catch (err) {
            alert("You have not created an account");
            Router.pushRoute('/list');
        }
    }

    renderDisplay() {
        return(
            <div>
                <Segment inverted color='red'>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Doctor Profile</h2>
                    <Segment>
                        <h3>IC: {this.props.ic}</h3>
                        <h3>Name: {this.props.name}</h3>
                        <h3>Phone: {this.props.phone}</h3>
                        <h3>Gender: {this.props.gender}</h3>
                        <h3>Date of Birth: {this.props.dob}</h3>
                        <h3>Qualification: {this.props.qualification}</h3>
                        <h3>Major: {this.props.major}</h3>
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

export default DoctorDetails;