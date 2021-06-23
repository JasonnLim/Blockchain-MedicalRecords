import React, { Component } from 'react';
import { Form, Input, Button, Message} from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';

class PatientForm extends Component {
    state = {
        name: '',
        age: '',
        phone: '',
        disease: '',
        loading: false,
        errorMessage: ''
    };

    onSubmit = async event => {
        event.preventDefault();

        const { name, age, phone, disease } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.setDetails(
                name, age, phone, disease
            ).send({ from: accounts[0] });
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, name: '', age: '', phone: '', disease: ''});
    }

    render() {
        return (
            <Layout>
                <h2 style={{ marginTop: '20px', textAlign: 'center' }}>Personal Health Record</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Name</label>
                        <Input                            
                            value= {this.state.name}
                            onChange= {event => 
                                this.setState({ name: event.target.value })}                           
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Age</label>
                        <Input 
                            value= {this.state.age}
                            onChange= {event => 
                                this.setState({ age: event.target.value })}  
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Phone</label>
                        <Input 
                            value= {this.state.phone}
                            onChange= {event => 
                                this.setState({ phone: event.target.value })}  
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Disease</label>
                        <Input 
                            value= {this.state.disease}
                            onChange= {event => 
                                this.setState({ disease: event.target.value })}  
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default PatientForm;