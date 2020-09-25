import {observable, action,computed} from 'mobx'
import { createComma } from 'typescript'
import { createContext, SyntheticEvent } from 'react'
import { IActivity } from '../model/activity';
import agent from '../api/agent';
import ActivityList from '../../Features/activities/dashboard/ActivityList';


class ActivityStore{
  // map observable qui permet de rafraichir les tableaux
  @observable activityRegistery = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity : IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';
  
  //computed permet de trier par date
  //@computed est une simple directive qui dit à MobX : 
  //"cette valeur pourrait être mise en cache jusqu'à ce qu'un des observables
  //utilisés change". 
  @computed get activityByDate(){
    //comme activityRegistery n'est pas un array, 
    //on récupère un iterable des valeurs du observable map
    //on convertit en Array--> Array.from()...
    return Array.from(this.activityRegistery.values()).sort((a,b)=> Date.parse(b.date) -Date.parse(a.date));
    //this.activities.sort((a,b)=> Date.parse(b.date) -Date.parse(a.date))
  };

  @action loadActivity = async()=>{
    this.loadingInitial = true;
    try{
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        //supprimer la partie après l'heure
        activity.date = activity.date.split('.')[0];
        this.activityRegistery.set(activity.id,activity);
      });
    }catch(error){
      console.log(error);
      this.loadingInitial = false;
    };
    this.loadingInitial = false;
  }

  @action createActivity = async(activity: IActivity)=>{
    this.submitting = true;
    try{
      await agent.Activities.create(activity);
      this.activityRegistery.set(activity.id, activity);
      this.selectedActivity = activity;
      this.submitting = false;
      this.editMode = false;
    }catch(e){
      console.log(e);
      this.submitting = false;
    }
  }

  @action editActivity = async(activity: IActivity)=>{
    this.submitting = true;
    try{
      await agent.Activities.update(activity);
      this.activityRegistery.set(activity.id, activity);
      this.selectedActivity = activity;
      this.editMode = false;
      this.submitting = false;

    }catch(e){
      console.log(e);
      this.submitting = false; 
    }
  }

  @action deleteActivity = async(event: SyntheticEvent <HTMLButtonElement>,id : string)=>{
    //tout bête on affiche ce qui est différent de la selection
    this.target = event.currentTarget.name;
    this.submitting = true;
    try{
      await agent.Activities.delete(id)
     // this.activities = this.activities.filter(a => a.id !== id);
     this.activityRegistery.delete(id); 
     this.submitting = false;
     this.target = '';
     this.selectedActivity= undefined;
    }catch(e){
      console.log(e);
      this.submitting = false;
      this.target = '';
    }
   //setTarget(event.currentTarget.name)
   // agent.Activities.delete(id).then(()=>{
   //   setActivities([...activities.filter(a => a.id !== id)])
   // }).then(()=>setSubmit(false));
  }

  @action selectActivity = (id: string)=>{
    // dans video .filter(a => a.id === id) et selectedActivity : IActivity | undefined
    //this.selectedActivity = this.activities.find(a => a.id === id);
    this.selectedActivity = this.activityRegistery.get(id);
    this.editMode = (false);
  }

  @action cancelSelectedActivity = ()=>{
    this.selectedActivity = undefined;
  }

  // @action createActivity(activity: IActivity){
  //   this.submitting = true;
  //   agent.Activities.create(activity);
  // }
  @action cancelOpenForm  = ()=>{
    this.editMode = false;
  }
  @action openEditMode = (id: string)=>{
    this.selectedActivity = this.activityRegistery.get(id)
    this.editMode = true;
  }
  @action openCreateMode = ()=>{
    this.editMode = true;
    this.selectedActivity = undefined;
  }
}

export default createContext(new ActivityStore())