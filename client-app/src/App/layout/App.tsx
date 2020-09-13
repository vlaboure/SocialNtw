import React, {useState, useEffect, Fragment, SyntheticEvent} from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import { render } from '@testing-library/react';
import axios from 'axios'
import {IActivity} from '../model/activity'
import NavBar from '../../Features/nav/NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard'
import agent from '../api/agent'
import LoadingComponent from '../layout/LoadingComponent'
const App = ()=>{
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
 // const [editActivity, setEditedActivity] = useState<IActivity>()
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);// loading -- booleen qui indique si afficher loader
  const [submitting, setSubmit] = useState(false);// sumitting -- booleen qui indique si afficher loader
  const [target, setTarget]= useState('');

  const handleOpenCreateForm = () =>{
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleSelectedActivity = (id: string) =>{
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleDeleteActivity =(event: SyntheticEvent<HTMLButtonElement>,id : string)=>{
    //tout bête on affiche ce qui est différent de la selection
    setSubmit(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a => a.id !== id)])
    }).then(()=>setSubmit(false));
  }

  const handleCreateActivity = (activity: IActivity)=>{
    setSubmit(true);
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities,activity]);
      setSelectedActivity(activity);
          //gestion créer ou editer
      setEditMode(false);
    }).then(()=>setSubmit(false));
  }

  const handleEditActivity = (activity: IActivity)=>{
    setSubmit(true);
    agent.Activities.update(activity).then(()=>{
      //on crée un tableau avec tout ce qui est différent de acitvity à éditer
      // comme ça au submit on ajoute l'activity modifiée
      setActivities([...activities.filter(a => a.id !== activity.id),activity]);
      setSelectedActivity(activity);
      //efface l'affichage du form quand on clique sur view
      setEditMode(false);  
    }).then(()=>setSubmit(false));
  }


  // useEffect appelé après chaque affichage
  useEffect(()=>{
    agent.Activities.list()
    .then(response => {      
      //mise en forme de la date avant de la mettre dans activities
      //on remplit le tableau avec les valeurs splitées
      //response = tableau initial
      let activities : IActivity[] = [];
      response.forEach((activity) => {
        //supprimer la partie après l'heure
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      });
      setActivities(activities)
    }).then(()=>setLoading(false));
  }, []);

  //c'est ici qu'on appelle le composant si loading = true
  if(loading) return <LoadingComponent content='chargement en cours...'/>

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
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment  >
  );          
}

export default App;

