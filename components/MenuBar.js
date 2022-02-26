import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from '../routes';

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

            <Link route='/approve'>
              <a className='item'>Allow Access</a>
            </Link>

            <Link route='/doctor'>
                <a className='item'>Register Doctor</a>
            </Link>

            <Link route='/edit'>
              <a className='item'>Edit Record</a>
            </Link>

            <Link route='/form'>
                <a className='item'>Sign Up</a>
            </Link>
          </Menu.Menu>
      </Menu>  
    );
};