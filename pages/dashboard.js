import React, { PureComponent } from 'react';
import { Card, Icon, Image, Segment, Message, Statistic } from 'semantic-ui-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from '../routes';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

/*
const data = [
    {
      name: 'January',
      count: 2400,
    },
    {
      name: 'February',
      count: 2210,
    },
    {
      name: 'March',
      count: 2290,
    },
    {
      name: 'April',
      count: 2290,
    },
  ];
  */
  var data = [];

  const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default class Dashboard extends PureComponent {

    static async getInitialProps() {
        var patientCount = await record.methods.getPatientCount().call();
        var doctorCount = await record.methods.getDoctorCount().call();
        var appointmentCount = await record.methods.getAppointmentCount().call();
        var permissionGrantedCount = await record.methods.getPermissionGrantedCount().call();

        const accounts = await web3.eth.getAccounts();
        const allPatients = await record.methods.getPatients().call();
        var dict = {January:0, February:0, March:0, April:0, May:0, June:0, July:0, August:0, September:0, October:0, November:0, December:0};
        
        for(let i = 0; i < allPatients.length; i++){
            var addr = allPatients[i]
            var unixDate = await record.methods.searchRecordDate(addr).call({from: accounts[0]});
            var month = monthName[new Date(unixDate * 1000).getMonth()];
            dict[month] = (dict[month] || 0) + 1;
        }

        data = [
            {
              Name: Object.entries(dict)[0][0],
              Count: Object.entries(dict)[0][1],
            },
            {
              Name: Object.entries(dict)[1][0],
              Count: Object.entries(dict)[1][1],
            },
            {
              Name: Object.entries(dict)[2][0],
              Count: Object.entries(dict)[2][1],
            },
            {
              Name: Object.entries(dict)[3][0],
              Count: Object.entries(dict)[3][1],
            },
            {
              Name: Object.entries(dict)[4][0],
              Count: Object.entries(dict)[4][1],
            },
            {
              Name: Object.entries(dict)[5][0],
              Count: Object.entries(dict)[5][1],
            },
            {
              Name: Object.entries(dict)[6][0],
              Count: Object.entries(dict)[6][1],
            },
            {
              Name: Object.entries(dict)[7][0],
              Count: Object.entries(dict)[7][1],
            },
            {
              Name: Object.entries(dict)[8][0],
              Count: Object.entries(dict)[8][1],
            },
            {
              Name: Object.entries(dict)[9][0],
              Count: Object.entries(dict)[9][1],
            },
            {
              Name: Object.entries(dict)[10][0],
              Count: Object.entries(dict)[10][1],
            },
            {
              Name: Object.entries(dict)[11][0],
              Count: Object.entries(dict)[11][1],
            },
        ];

        return { patientCount, doctorCount, appointmentCount, permissionGrantedCount, data};
    }

    render() {
        return (
            <Layout>
                <>
                <Card.Group centered itemsPerRow='4'>
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

                    <Card>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='mini'
                                src='https://cdn-icons-png.flaticon.com/128/1642/1642097.png'
                            />
                            <Card.Header>Number of Permissions Granted</Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            <Message>
                                <Message.Header>{this.props.permissionGrantedCount}</Message.Header>
                            </Message>
                        </Card.Content>
                    </Card>
                </Card.Group>

                <h3 style={{textAlign: "center"}}>Number of Patient Records in 2022</h3>
                <ResponsiveContainer width="100%" aspect={3}>
                    <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Count" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
                </>
            </Layout>
        );
    }
}