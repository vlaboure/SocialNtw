import React, {useEffect, Fragment,useContext} from 'react';
import {Container } from 'semantic-ui-react'
import NavBar from '../../Features/nav/NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard'
import LoadingComponent from '../layout/LoadingComponent'
import ActivityStores from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import {Route} from 'react-router-dom'
import HomePage from '../../Features/home/HomePage'
import ActivityForm from '../../Features/activities/form/ActivityForm';
import ActivityDetail from '../../Features/activities/detail/ActivityDetail';

const App = ()=>{
  const activityStore = useContext(ActivityStores)

  // useEffect appelé après chaque affichage
  useEffect(()=>{
   activityStore.loadActivities()}, [activityStore]);

  //c'est ici qu'on appelle le composant si loading = true
  if(activityStore.loadingInitial) return <LoadingComponent content='chargement en cours...'/>

  return ( 
    <Fragment>
      <NavBar/>
      {/* Affichage des valeurs du array values */}
      <Container style= {{marginTop: '7rem'}}>
        {/* Route exact path: afficher que si localhost:3000 */}
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/activities' component={ActivityDashboard}/>
        <Route path='/activities/:id' component={ActivityDetail}/>
        <Route path={['/createActivity','/manage/:id']} component={ActivityForm}/>
      </Container>
    </Fragment  >
  );          
}

export default observer(App);

