import React from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from '../routes';
import { Router } from '../routes';

//Header that is used in all pages

export default () => {
    return (
      <Menu size='large' inverted>
          <Link route='/'>
              <a className='item'>Home</a>
          </Link>

          <Menu.Menu position='right'>
            <Link route='/list'>
                <a className='item'>Records List</a>
            </Link>

            <Dropdown item text='Doctor'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route='/list'>
                    <a style={{color:'black'}}>View Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/list'>
                    <a style={{color:'black'}}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/appointment'>
                    <a style={{color:'black'}}>Make Appointment</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/list'>
                    <a style={{color:'black'}}>Update Appointment</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            <Dropdown item text='Patient'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route='/list'>
                    <a style={{color:'black'}}>View Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/edit'>
                    <a style={{color:'black'}}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/approve'>
                    <a style={{color:'black'}}>Allow Access</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text='Register'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route='/form'>
                    <a style={{color:'black'}}>Patient</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/doctor'>
                    <a style={{color:'black'}}>Doctor</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Menu.Menu>
      </Menu>  
    );
};