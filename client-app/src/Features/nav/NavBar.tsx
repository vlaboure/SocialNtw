import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import React, {useContext} from 'react'
import {Menu, Container, Button} from 'semantic-ui-react'
import activityStores from '../../App/stores/activityStore'

// interface IProp{
//   openCreateForm: ()=> void;
// }

const NavBar: React.FC = () => {
  const activityStore = useContext(activityStores)

  return (
      <Menu fixed='top' inverted>
        <Container>
                          {/* exact comme dans App */}
          <Menu.Item header as={NavLink} exact to='/'>
            <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}  />
            Echangons..           
          </Menu.Item>
          <Menu.Item
            name='Posts' as={NavLink} to='/activities'
          />
          <Menu.Item>
            <Button 
              as={NavLink} to='/createActivity'
              positive 
              content='Créer un post'              
            />
          </Menu.Item>

        </Container>
      </Menu>
  )
}
export default observer(NavBar);
