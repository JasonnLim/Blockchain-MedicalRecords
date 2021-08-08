import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';

class RecordDetails extends Component {
    static async getInitialProps(props) {
        const addr = props.query.address;
        const accounts = await web3.eth.getAccounts();
        var records;

        try {
            records = await record.methods.searchPatient(addr).call({from: accounts[0]}); 

            return {
                address: addr,
                name: records[0],
                age: records[1],
                phone: records[2],
                disease: records[3]
            };
        }
        catch (err) {
            alert("You don't have permission to view this account");
        }
    }

    renderCardDisplay() {
        return(
            <Card.Group>
                <Card
                    fluid
                    header='Ethereum Address'
                    description= {this.props.address}
                />
                <Card
                    fluid
                    header='Name'
                    description= {this.props.name}
                />
                <Card
                    fluid
                    header='Age'
                    description= {this.props.age}
                />
                <Card
                    fluid
                    header='Phone'
                    description= {this.props.phone}
                />
                <Card
                    fluid
                    header='Disease'
                    description= {this.props.disease}
                />
            </Card.Group>
        );
    }

    render() {
        return (
            <Layout>
                <div>
                    {this.renderCardDisplay()}
                </div>
            </Layout>
        );
    }
}

export default RecordDetails;