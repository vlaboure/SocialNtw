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
              onClick= {activityStore.openCreateMode}
            />
          </Menu.Item>

        </Container>
      </Menu>
  )
}
export default observer(NavBar);
