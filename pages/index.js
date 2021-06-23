import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';

class RecordsList extends Component {
    static async getInitialProps() {
        const allRecords = await record.methods.getPatients().call();

        return { allRecords };
    }

    renderRecords() {
        const items = this.props.allRecords.map(address => {
            return {
                header: address,
                description: (
                    <a>View Record</a>
                ),
                fluid: true
            };
        });
        //Add all records to card group
        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <div>
                    <h2>Medical Records List</h2>
                    {this.renderRecords()}
                </div>
            </Layout>
        );
    }
}

export default RecordsList;