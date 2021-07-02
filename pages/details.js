import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';

class RecordDetails extends Component {
    static async getInitialProps(props) {
        const owner = await record.methods.owner().call();
        const records = await record.methods.searchPatient(owner).call();
        
        return {
            address: props.query.address,
            names: records[0],
            owner: owner
        };
    }

    render() {
        return (
            <Layout>
                <div>
                    {this.props.address}
                    {this.props.names}
                    {this.props.owner}
                </div>
            </Layout>
        );
    }
}

export default RecordDetails;