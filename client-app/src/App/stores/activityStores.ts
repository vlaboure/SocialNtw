import {observable, action} from 'mobx'
import { createComma } from 'typescript'
import { createContext } from 'react'
import { IActivity } from '../model/activity';
import agent from '../api/agent';


class ActivityStores{
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity : IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  

  @action loadActivity = ()=>{
    this.loadingInitial = true;
    agent.Activities.list()
    .then(activities => {      
      //mise en forme de la date avant de la mettre dans activities
      //on remplit le tableau avec les valeurs splitées
      //response = tableau initial

      activities.forEach((activity) => {
        //supprimer la partie après l'heure
        activity.date = activity.date.split('.')[0];
        this.activities.push(activity);
      });
    }).finally(()=>this.loadingInitial = false);
  }

  @action selectActivity = (id: string)=>{
    // dans video .filter(a => a.id === id) et selectedActivity : IActivity | undefined
    this.selectedActivity = this.activities.find(a => a.id === id);
    this.editMode = (false);
  }

  @action cancelSelectedActivity = ()=>{
    this.selectedActivity = undefined;
  }

  @action createActivity(activity: IActivity){
    this.submitting = true;
    agent.Activities.create(activity);
  }

  @action openEditMode = ()=>{
    this.editMode = true;
  }
  @action openCreateMode = ()=>{
    this.editMode = true;
    this.selectedActivity = undefined;
  }
}

export default createContext(new ActivityStores())