import React from 'react'
import { Link } from 'react-router-dom'
import {Container} from 'semantic-ui-react'
const HomePage = () => {
    return (
        <div>
            <Container style={{marginTop:'7rem'}}>
                <h1>Home page</h1>
                <h3>aller vers les <Link to='/activities'>posts</Link></h3>
            </Container>
        </div>
    )
}

export default HomePage
