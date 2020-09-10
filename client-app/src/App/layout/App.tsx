import React, {useState, useEffect, Fragment} from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import { render } from '@testing-library/react';
import axios from 'axios'
import {IActivity} from '../model/activity'
import NavBar from '../../Features/nav/NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard'

const App = ()=>{
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
 // const [editActivity, setEditedActivity] = useState<IActivity>()
  const [editMode, setEditMode] = useState(false);

  const handleOpenCreateForm = () =>{
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleSelectedActivity = (id: string) =>{
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  }

  useEffect(()=>{
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response)=>{      
      setActivities(response.data)
    });
  }, []);

  return ( 
    <Fragment>
      <NavBar openCreateForm = {handleOpenCreateForm}/>
      {/* Affichage des valeurs du array values */}
      <Container style= {{marginTop: '7rem'}}>
        <ActivityDashboard 
          activities={activities}
          selectActivity={handleSelectedActivity}
// {selectedActivity!}==== le ! permet de passer une erreur IActivity or null           
          selectedActivity={selectedActivity!}
          editMode = {editMode}
          setEditMode = {setEditMode}
          setSelectedActvity={setSelectedActivity}
        />
      </Container>
    </Fragment  >
  );          
}

export default App;

