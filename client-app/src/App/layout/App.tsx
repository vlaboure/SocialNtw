import React, {Component} from 'react';
import { Header, Icon, List } from 'semantic-ui-react'
import { render } from '@testing-library/react';
import axios from 'axios'

class App extends Component {
  // values --> tableau de valeurs à afficher
  state = {
    values : []
  }
  //componentDidMount 
  //setState dans componentDidMount !!! a éviter, ralentit
  componentDidMount(){
    axios.get('http://localhost:5000/api/values')
    .then((response)=>{
      
      this.setState({
        values: response.data
      })
    })

  }
  render(){
    return ( 
      <div>
         <Header as='h2'>
            <Icon name='users' />
            <Header.Content>react test</Header.Content>
        </Header>
        
         
          {/* Affichage des valeurs du array values */}
          <List>
            {this.state.values.map((value: any) => (
              <List.Item key={value.id}>{value.name}</List.Item>
            ))}
          </List>
  

      </div>
    );
  }
  
}

export default App;
