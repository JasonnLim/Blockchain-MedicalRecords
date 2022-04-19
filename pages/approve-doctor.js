import React, { Component } from 'react';
import { Segment, Input, Header, Message, Button, Form } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';

class ApproveDoctor extends Component {
    state = {
        doctorAddr: '',
        loading: '',
        errorMessage: '' 
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.givePermission(this.state.doctorAddr).send({ from: accounts[0] });

            alert("Permission Granted Successfully!");
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, doctorAddr: ''});
    }

    render() {
        return (
            <Layout>
                <Segment>
                    <Header
                            as='h2'
                            content='Allow Access'
                            subheader='Give doctor or patient permission to view records'
                    ></Header>
                    <Input 
                        fluid
                        placeholder = "Doctor's Ethereum Address"
                        value= {this.state.doctorAddr}
                        onChange= {event => 
                            this.setState({ doctorAddr: event.target.value })}  
                    /><br/>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Message error header="Oops!" content={this.state.errorMessage}/>
                        <Button primary loading={this.state.loading}>Approve</Button>
                    </Form>
                </Segment>
            </Layout>
        );
    }
}

export default ApproveDoctor;