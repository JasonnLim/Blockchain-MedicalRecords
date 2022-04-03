import React, { Component } from 'react';
import { Card, Icon, Image, Segment, Message, Statistic } from 'semantic-ui-react';
import { Link } from '../routes';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class Dashboard extends Component {

    static async getInitialProps() {
        var patientCount = await record.methods.getPatientCount().call();
        var doctorCount = await record.methods.getDoctorCount().call();
        var appointmentCount = await record.methods.getAppointmentCount().call();
        
        return { patientCount, doctorCount, appointmentCount };
    }

    render() {
        return (
            <Layout>
                <Card.Group centered>
                    <Card>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src='https://cdn-icons-png.flaticon.com/128/1512/1512910.png'
                            />
                            <Card.Header>Number of Patient Records</Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            <Message>
                                <Message.Header>{this.props.patientCount}</Message.Header>
                            </Message>
                        </Card.Content>
                    </Card>

                    <Card>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src='https://cdn-icons-png.flaticon.com/128/3481/3481061.png'
                            />
                            <Card.Header>Number of Doctors</Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            <Message>
                                <Message.Header>{this.props.doctorCount}</Message.Header>
                            </Message>
                        </Card.Content>
                    </Card>

                    <Card>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src='https://cdn-icons-png.flaticon.com/128/2693/2693507.png'
                            />
                            <Card.Header>Number of Appointments</Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            <Message>
                                <Message.Header>{this.props.appointmentCount}</Message.Header>
                            </Message>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Layout>
        );
    }
}

export default Dashboard;