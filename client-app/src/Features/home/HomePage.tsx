import React from 'react'
import { Link } from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import {Image, Segment, Button, Item, Header} from 'semantic-ui-react'


const HomePage = () => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                <Header as='h2' inverted content='Welcome to Reactivities' />
                <Button as={Link} to='/activities' size='huge' inverted>
                    Take me to the activities!
                </Button>
            </Container>
        </Segment>
        // <div>
        //     <Container style={{marginTop:'7rem'}}>
        //         <h1>Home page</h1>
        //         <h3>aller vers les <Link to='/activities'>posts</Link></h3>
        //     </Container>
        // </div>
    )
}

export default HomePage
