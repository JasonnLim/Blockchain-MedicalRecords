import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import Head from 'next/head';
import MenuBar from './MenuBar';

//Layout properly the Header at the top of every page and then the content come afterwards

export default props => {
    return (
        <Container>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"></link>
            </Head>

            <Header as='h2' color='red' style={{ marginTop: '20px' }}>
                <Icon name='hospital'/>
                <Header.Content>Blockchain Medical Records      
                    <Header.Subheader>Ensure that your records are safe and sound</Header.Subheader>
                </Header.Content>
            </Header>

            <MenuBar />
            {props.children}
        </Container>
    );
};