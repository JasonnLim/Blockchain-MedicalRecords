import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';

class RecordDetails extends Component {
    static async getInitialProps(props) {
        const addr = props.query.address;
        const records = await record.methods.searchPatient(addr).call({from: addr});

        return {
            address: addr,
            name: records[0],
            age: records[1],
            phone: records[2],
            disease: records[3]
        };
    }

    render() {
        return (
            <Layout>
                <div>
                    {this.props.address}<br/>
                    {this.props.name}<br/>
                    {this.props.age}<br/>
                    {this.props.phone}<br/>
                    {this.props.disease}<br/>
                </div>
            </Layout>
        );
    }
}

export default RecordDetails;