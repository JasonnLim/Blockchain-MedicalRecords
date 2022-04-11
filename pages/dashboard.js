import React, { PureComponent } from 'react';
import { Card, Icon, Image, Segment, Message, Statistic } from 'semantic-ui-react';
import { AreaChart, Area, LineChart, Line, PieChart, Pie, Sector, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from '../routes';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

  var data = [];
  var pieData = [];
  var lineData = [];

  const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.Name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Appointments: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Percentage: ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

export default class Dashboard extends PureComponent {

    state = {
        activeIndex: 0,
    };
    
    onPieEnter = (_, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    static async getInitialProps() {  
        const accounts = await web3.eth.getAccounts();
        const allPatients = await record.methods.getPatients().call();
        const allDoctors = await record.methods.getDoctors().call();
        const allAppointments = await record.methods.getAppointments().call();

        var patientCount = await record.methods.getPatientCount().call();
        var doctorCount = await record.methods.getDoctorCount().call();
        var appointmentCount = await record.methods.getAppointmentCount().call();
        var permissionGrantedCount = await record.methods.getPermissionGrantedCount().call();

        var dict = {January:0, February:0, March:0, April:0, May:0, June:0, July:0, August:0, September:0, October:0, November:0, December:0};
        var docdict = {January:0, February:0, March:0, April:0, May:0, June:0, July:0, August:0, September:0, October:0, November:0, December:0};
        var apptdict = {January:0, February:0, March:0, April:0, May:0, June:0, July:0, August:0, September:0, October:0, November:0, December:0};

        //Populate patient object with data retrieved from the blockchain to be used in area chart
        for(let i = 0; i < allPatients.length; i++){
            var addr = allPatients[i]
            var unixDate = await record.methods.searchRecordDate(addr).call({from: accounts[0]});
            var month = monthName[new Date(unixDate * 1000).getMonth()];
            dict[month] = (dict[month] || 0) + 1;
        }
        
        //Populate doctor object with data retrieved from the blockchain to be used in area chart
        for(let i = 0; i < allDoctors.length; i++){
            var addr = allDoctors[i]
            var unixDate = await record.methods.searchDoctorDate(addr).call({from: accounts[0]});
            var month = monthName[new Date(unixDate * 1000).getMonth()];
            docdict[month] = (docdict[month] || 0) + 1;
        }

        //Populate appointment object with data retrieved from the blockchain to be used in line chart
        for(let i = 0; i < allAppointments.length; i++){
            var addr = allAppointments[i]
            var unixDate = await record.methods.searchAppointmentDate(addr).call({from: accounts[0]});
            var month = monthName[new Date(unixDate * 1000).getMonth()];
            apptdict[month] = (apptdict[month] || 0) + 1;
        }

        //Populate appointment array with data retrieved from the blockchain to be used in piechart
        for(let i = 0; i < allPatients.length; i++){
            var addr = allPatients[i]
            var count = await record.methods.getAppointmentPerPatient(addr).call({from: accounts[0]});

            if(addr == 0 && addr == null){
                pieData[i] = {'0': 0}
            }

            //Dynamically render piechart data
            pieData[i] = {'Name': addr, 'Count': parseInt(count)};
        }
        
        var today = new Date();
        var mm = String(today.getMonth());
        var resultPat, resultAppt, patientMonthOverMonthChange, appointmentMonthOverMonthChange;

        //Retrieve and display month-over-month patient growth
        for(let i = 0; i < 12; i++){
          if(monthName[mm] == Object.entries(dict)[i][0]){
            resultPat = parseInt(Object.entries(dict)[i][1]) - parseInt(Object.entries(dict)[--i][1]);
            patientMonthOverMonthChange = (resultPat * 100).toFixed(2);
            break;
          }
        }

        //Retrieve and display month-over-month appointment growth
        for(let i = 0; i < 12; i++){
          if(monthName[mm] == Object.entries(apptdict)[i][0]){
            resultAppt = parseInt(Object.entries(apptdict)[i][1]) - parseInt(Object.entries(apptdict)[--i][1]);
            appointmentMonthOverMonthChange = (resultAppt * 100).toFixed(2);
            break;
          }
        }

        var patGrowthColor = (patientMonthOverMonthChange > 0) ? 'green' : 'red';
        var apptGrowthColor = (appointmentMonthOverMonthChange > 0) ? 'green' : 'red';

        data = [
            {
              Name: Object.entries(dict)[0][0],
              Patients: Object.entries(dict)[0][1],
              Doctors: Object.entries(docdict)[0][1],
            },
            {
              Name: Object.entries(dict)[1][0],
              Patients: Object.entries(dict)[1][1],
              Doctors: Object.entries(docdict)[1][1],
            },
            {
              Name: Object.entries(dict)[2][0],
              Patients: Object.entries(dict)[2][1],
              Doctors: Object.entries(docdict)[2][1],
            },
            {
              Name: Object.entries(dict)[3][0],
              Patients: Object.entries(dict)[3][1],
              Doctors: Object.entries(docdict)[3][1],
            },
            {
              Name: Object.entries(dict)[4][0],
              Patients: Object.entries(dict)[4][1],
              Doctors: Object.entries(docdict)[4][1],
            },
            {
              Name: Object.entries(dict)[5][0],
              Patients: Object.entries(dict)[5][1],
              Doctors: Object.entries(docdict)[5][1],
            },
            {
              Name: Object.entries(dict)[6][0],
              Patients: Object.entries(dict)[6][1],
              Doctors: Object.entries(docdict)[6][1],
            },
            {
              Name: Object.entries(dict)[7][0],
              Patients: Object.entries(dict)[7][1],
              Doctors: Object.entries(docdict)[7][1],
            },
            {
              Name: Object.entries(dict)[8][0],
              Patients: Object.entries(dict)[8][1],
              Doctors: Object.entries(docdict)[8][1],
            },
            {
              Name: Object.entries(dict)[9][0],
              Patients: Object.entries(dict)[9][1],
              Doctors: Object.entries(docdict)[9][1],
            },
            {
              Name: Object.entries(dict)[10][0],
              Patients: Object.entries(dict)[10][1],
              Doctors: Object.entries(docdict)[10][1],
            },
            {
              Name: Object.entries(dict)[11][0],
              Patients: Object.entries(dict)[11][1],
              Doctors: Object.entries(docdict)[11][1],
            },
        ];

        lineData = [
            {
              Name: Object.entries(apptdict)[0][0],
              Count: Object.entries(apptdict)[0][1],
            },
            {
              Name: Object.entries(apptdict)[1][0],
              Count: Object.entries(apptdict)[1][1],
            },
            {
              Name: Object.entries(apptdict)[2][0],
              Count: Object.entries(apptdict)[2][1],
            },
            {
              Name: Object.entries(apptdict)[3][0],
              Count: Object.entries(apptdict)[3][1],
            },
            {
              Name: Object.entries(apptdict)[4][0],
              Count: Object.entries(apptdict)[4][1],
            },
            {
              Name: Object.entries(apptdict)[5][0],
              Count: Object.entries(apptdict)[5][1],
            },
            {
              Name: Object.entries(apptdict)[6][0],
              Count: Object.entries(apptdict)[6][1],
            },
            {
              Name: Object.entries(apptdict)[7][0],
              Count: Object.entries(apptdict)[7][1],
            },
            {
              Name: Object.entries(apptdict)[8][0],
              Count: Object.entries(apptdict)[8][1],
            },
            {
              Name: Object.entries(apptdict)[9][0],
              Count: Object.entries(apptdict)[9][1],
            },
            {
              Name: Object.entries(apptdict)[10][0],
              Count: Object.entries(apptdict)[10][1],
            },
            {
              Name: Object.entries(apptdict)[11][0],
              Count: Object.entries(apptdict)[11][1],
            },
        ]

        return { patientCount, doctorCount, appointmentCount, permissionGrantedCount, data, pieData, patientMonthOverMonthChange, appointmentMonthOverMonthChange, patGrowthColor, apptGrowthColor };
    }

    render() {
        return (
            <Layout>
                <>
                <Card.Group centered itemsPerRow='2'>
                  <Card color={this.props.patGrowthColor}>
                      <Card.Content>
                          <Image
                              floated='right'
                              size='mini'
                              src='https://cdn-icons-png.flaticon.com/512/858/858736.png'
                          />
                          <Card.Header>Month-over-Month Patient Growth</Card.Header>
                      </Card.Content>
                      <Card.Content extra>
                      <Statistic size='small' color={this.props.patGrowthColor}>
                          <Statistic.Value>{this.props.patientMonthOverMonthChange}%</Statistic.Value>
                      </Statistic>
                      </Card.Content>
                  </Card>

                  <Card color={this.props.apptGrowthColor}>
                      <Card.Content>
                          <Image
                              floated='right'
                              size='mini'
                              src='https://cdn-icons-png.flaticon.com/512/858/858736.png'
                          />
                          <Card.Header>Month-over-Month Appointment Growth</Card.Header>
                      </Card.Content>
                      <Card.Content extra>
                        <Statistic size='small' color={this.props.apptGrowthColor}>
                            <Statistic.Value>{this.props.appointmentMonthOverMonthChange}%</Statistic.Value>
                        </Statistic>
                      </Card.Content>
                  </Card>
                </Card.Group>

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
                        <Statistic size='small'>
                            <Statistic.Value>{this.props.patientCount}</Statistic.Value>
                        </Statistic>
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
                        <Statistic size='small'>
                            <Statistic.Value>{this.props.doctorCount}</Statistic.Value>
                        </Statistic>
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
                        <Statistic size='small'>
                            <Statistic.Value>{this.props.appointmentCount}</Statistic.Value>
                        </Statistic>
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
                        <Statistic size='small'>
                            <Statistic.Value>{this.props.permissionGrantedCount}</Statistic.Value>
                        </Statistic>
                        </Card.Content>
                    </Card>
                </Card.Group>

                <Segment padded>
                    <h3 style={{textAlign: "center"}}>Number of Patients vs Doctors in 2022</h3>
                    <ResponsiveContainer width="100%" aspect={3}>
                        <AreaChart 
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}>
                            <defs>
                                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorDoctors" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#89cff0" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#89cff0" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="Name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="Doctors" stroke="#89cff0" fillOpacity={1} fill="url(#colorDoctors)" />
                            <Area type="monotone" dataKey="Patients" stroke="#8884d8" fillOpacity={1} fill="url(#colorPatients)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Segment>
                
                <Segment padded>
                  <h3 style={{textAlign: "center"}}>Number of Appointments in 2022</h3>
                  <ResponsiveContainer width="100%" aspect={3}>
                      <LineChart
                      width={500}
                      height={300}
                      data={lineData}
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
                </Segment>
                
                <Segment padded>
                    <h3 style={{textAlign: "center"}}>Number of Appointments per Patient</h3>
                    <ResponsiveContainer width="100%" aspect={2.15}>
                        <PieChart 
                            width={400} 
                            height={400}>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={180}
                            outerRadius={200}
                            fill="#8884d8"
                            dataKey="Count"
                            onMouseEnter={this.onPieEnter}
                        />
                        </PieChart>
                    </ResponsiveContainer>
                </Segment>
                </>
            </Layout>
        );
    }
}