import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from '../routes';

//Header that is used in all pages

export default () => {
    return (
      <Menu>
          <Link route='/'>
              <a className='item'>Home</a>
          </Link>

          <Menu.Menu position='right'>
            <Link route='/'>
                <a className='item'>Records List</a>
            </Link>

            <Link route='/form'>
                <a className='item'>+</a>
            </Link>
          </Menu.Menu>
      </Menu>  
    );
};