import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from '../routes';
import { Router } from '../routes';
import web3 from '../ethereum/web3';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Dropdown
} from 'semantic-ui-react'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"></link>
    <Header
      as='h1'
      content='Blockchain Medical Record System'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
        fontFamily:'Georgia',
      }}
    />
    <Header
      as='h2'
      content='Ensure that your records are safe and sound'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge' inverted>
      <Link route='/dashboard'>
        <a className='item'>Get Started</a>
      </Link>
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  onClickedPatient = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  }

  onClickedDoctor = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/doctor/${accounts[0]}`);
  }

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu size='large' inverted>
              <Link route='/'>
                  <a className='item'>Home</a>
              </Link>

              <Menu.Menu position='right'>
                <Link route='/dashboard'>
                    <a className='item'>Dashboard</a>
                </Link>

                <Link route='/list'>
                    <a className='item'>Records List</a>
                </Link>

                <Dropdown item text='Doctor'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link route='/'>
                        <a style={{color:'black'}} onClick={this.onClickedDoctor}>View Profile</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route='/edit-doctor'>
                        <a style={{color:'black'}}>Edit Profile</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route='/make-appointment'>
                        <a style={{color:'black'}}>Make Appointment</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route='/edit-appointment'>
                        <a style={{color:'black'}}>Update Appointment</a>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
                <Dropdown item text='Patient'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link route='/'>
                        <a style={{color:'black'}} onClick={this.onClickedPatient}>View Profile</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route='/edit-patient'>
                        <a style={{color:'black'}}>Edit Profile</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route='/approve-doctor'>
                        <a style={{color:'black'}}>Allow Access</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route='/revoke-doctor'>
                        <a style={{color:'black'}}>Revoke Access</a>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown item text='Register'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link route='/register-patient'>
                        <a style={{color:'black'}}>Patient</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link route='/register-doctor'>
                        <a style={{color:'black'}}>Doctor</a>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </Menu.Menu>
            </Menu>    
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })
  handleToggle = () => this.setState({ sidebarOpened: true })

  onClickedPatient = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  }

  onClickedDoctor = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/doctor/${accounts[0]}`);
  }

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Link route='/'>
                <a className='item'>Home</a>
            </Link>

            <Link route='/dashboard'>
                <a className='item'>Dashboard</a>
            </Link>
  
            <Link route='/list'>
                <a className='item'>Records List</a>
            </Link>
  
            <Dropdown item text='Doctor'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route='/'>
                    <a style={{color:'black'}} onClick={this.onClickedDoctor}>View Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/edit-doctor'>
                    <a style={{color:'black'}}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/make-appointment'>
                    <a style={{color:'black'}}>Make Appointment</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/edit-appointment'>
                    <a style={{color:'black'}}>Update Appointment</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              
            <Dropdown item text='Patient'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route='/'>
                    <a style={{color:'black'}} onClick={this.onClickedPatient}>View Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/edit-patient'>
                    <a style={{color:'black'}}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/approve-doctor'>
                    <a style={{color:'black'}}>Allow Access</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/revoke-doctor'>
                    <a style={{color:'black'}}>Revoke Access</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text='Register'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route='/register-patient'>
                    <a style={{color:'black'}}>Patient</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/register-doctor'>
                    <a style={{color:'black'}}>Doctor</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>                 
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Help Companies and Companions
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We can give your company superpowers to do things that they never thought possible.
              Let us delight your customers and empower your needs... through reliable medical record systems.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Make Blockchain Medical Systems
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes that's right, beautifully designed and easy to use medical record systems.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='https://cdn.stocksnap.io/img-thumbs/960w/male-doctor_KN1OCKC4Y2.jpg' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='huge'>Check Us Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "Easy to use, Reliable, Secure"
            </Header>
            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              "One of the Best Blockchain Medical Record Systems available."
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              <Image avatar src='https://365psd.com/images/istock/previews/8717/87172655-female-doctor-icon-nurse-symbol-faceless-woman-doctor-with-a-stethoscope.jpg' />
              <b>Dr Lim</b>, Surgeon at Pantai Hospital
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Major Issue with Medical Record Systems
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Hospital emergency department (ED) found that doctors spent 43% of their time on data entry. 
          Only 28% of the doctors make direct patient contact. 
        </p>
        <Button as='a' size='large'>
          Read More
        </Button>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>

        <Header as='h3' style={{ fontSize: '2em' }}>
          Is Blockchain the best step forward for Medical Record Systems?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
        Blockchain technology has the potential to enable more secure, transparent, and equitable data management.
        In addition to securely managing data, blockchain has significant advantages in distributing data access, control, and ownership to end users.
        </p>
        <Button as='a' size='large'>
          View Research
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Creator Info</List.Item>
                <List.Item as='a'>Site Details</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Create Blockchain System</List.Item>
                <List.Item as='a'>Store Medical Record</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite Ducks</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout