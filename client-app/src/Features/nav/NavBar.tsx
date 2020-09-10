import React from 'react'
import {Menu, Container, Button} from 'semantic-ui-react'

interface IProp{
  openCreateForm: ()=> void;
}

const NavBar: React.FC<IProp> = ({openCreateForm}) => {
    return (
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item>
              <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}  />
              Echangons..           
            </Menu.Item>
            <Menu.Item
              name='Posts'
            />
            <Menu.Item>
              <Button 
                positive 
                content='Créer un post'
                onClick= {openCreateForm}
              />
            </Menu.Item>

          </Container>
      </Menu>
    )
}
export default NavBar;
