import React, {useEffect, Fragment,useContext} from 'react';
import {Container } from 'semantic-ui-react'
import NavBar from '../../Features/nav/NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard'
import LoadingComponent from '../layout/LoadingComponent'
import ActivityStores from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import {Route, RouteComponentProps, withRouter} from 'react-router-dom'
import HomePage from '../../Features/home/HomePage'
import ActivityForm from '../../Features/activities/form/ActivityForm';
import ActivityDetail from '../../Features/activities/detail/ActivityDetail';

                                     //location -- propriété de RouteComponentProps
const App : React.FC<RouteComponentProps> = ({location})=>{

  return ( 
    <Fragment>
        {/* si on est à la racine que le HomePage */}
      <Route exact path='/' component={HomePage}/>
        {/* si quelquechose après / -->{'/(.+)'} */}
        {/* affichage du menu */}
      <Route path={'/(.+)'} render={()=>(
        <Fragment>
          <NavBar/>
          {/* Affichage des valeurs du array values */}
          <Container style= {{marginTop: '7rem'}}>
            {/* Route exact path: afficher que si localhost:3000 */}
    
            <Route exact path='/activities' component={ActivityDashboard}/>
            <Route path='/activities/:id' component={ActivityDetail}/>
            <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}/>
          </Container>
        </Fragment>
      )}/>

    </Fragment >
  );          
}

export default withRouter(observer(App));

