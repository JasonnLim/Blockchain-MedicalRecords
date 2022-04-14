import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select} from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';

const genderOptions = [
    { key: 'm', text: 'Male', value: 'Male' },
    { key: 'f', text: 'Female', value: 'Female' },
    { key: 'o', text: 'Other', value: 'Other' },
]

const qualificationOptions = [
    { key: 'h', text: 'Higher Certificate/SPM', value: 'Higher Certificate/SPM' },
    { key: 'd', text: 'Diploma', value: 'Diploma' },
    { key: 'b', text: 'Bachelor\'s Degree', value: 'Bachelor\'s Degree' },
    { key: 'm', text: 'Master\'s Degree', value: 'Master\'s Degree' },
    { key: 'dd', text: 'Doctoral Degree', value: 'Doctoral Degree' },
]

class RegisterDoctor extends Component {
    state = {
        ic: '',
        name: '',
        phone: '',
        gender: '',
        dob: '',
        qualification: '',
        major: '',
        loading: false,
        errorMessage: ''
    };

    handleGender = (e, { value }) => this.setState({ gender: value })

    handleQualification = (e, { value }) => this.setState({ qualification: value })

    onSubmit = async event => {
        event.preventDefault();

        const { ic, name, phone, gender, dob, qualification, major } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.setDoctor(
                ic, name, phone, gender, dob, qualification, major
            ).send({ from: accounts[0] });

            alert("Doctor account created successfully!");
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("This Doctor account already exists");
        }

        this.setState({ loading: false, ic: '', name: '', phone: '', gender: '', dob: '', qualification: '', major: ''});
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>Register New Doctor</h1></Segment>
                <Segment>
                <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>General Information</h2>
                <Divider clearing />
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>IC</label>
                            <Input
                                placeholder = 'Eg. 001234010234'                
                                value= {this.state.ic}
                                onChange= {event => 
                                    this.setState({ ic: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Full Name</label>
                            <Input
                                placeholder = 'Eg. John Smith'                        
                                value= {this.state.name}
                                onChange= {event => 
                                    this.setState({ name: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Phone</label>
                            <Input
                                placeholder = 'Eg. 0123456789'
                                value= {this.state.phone}
                                onChange= {event => 
                                    this.setState({ phone: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>              
                    <Form.Group widths='equal'>
                        <Form.Field 
                            label='Gender' 
                            control={Select} 
                            options={genderOptions} 
                            onChange={this.handleGender}
                        />

                        <Form.Field>
                            <label>Date of Birth</label>
                            <Input 
                                placeholder = 'Eg. 01/01/1997'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>                   
                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Education Information</h2>
                    <Divider clearing />
                    <Form.Group widths='equal'>
                        <Form.Field 
                            label='Highest Qualification' 
                            control={Select} 
                            options={qualificationOptions} 
                            onChange={this.handleQualification}
                        />

                        <Form.Field>
                            <label>Major</label>
                            <Input 
                                placeholder = 'Eg. Biology'
                                value= {this.state.major}
                                onChange= {event => 
                                    this.setState({ major: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
                </Segment>
            </Layout>
        );
    }
}

export default RegisterDoctor;