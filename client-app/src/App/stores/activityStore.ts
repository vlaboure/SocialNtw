import {observable, action, computed, configure, runInAction} from 'mobx'
import { createContext, SyntheticEvent } from 'react'
import { IActivity } from '../model/activity';
import agent from '../api/agent';
//#region 
// on veut forcer l'écriture ne mode strict
//-->chaque modification d'un observable doit passer par une action
//comme ---then---await---@action
//#endregion
configure({enforceActions:'always'});

class ActivityStore{
  // map observable qui permet de rafraichir les tableaux
  @observable activityRegistery = new Map();
 // @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable activity : IActivity | null = null;//selectedActivity
 // @observable editMode = false;
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

  @action loadActivities = async()=>{
    this.loadingInitial = true;
    try{
      const activities = await agent.Activities.list();
      runInAction('load activities',()=>{
        activities.forEach((activity) => {
          //supprimer la partie après l'heure
          activity.date = activity.date.split('.')[0];
          this.activityRegistery.set(activity.id,activity);
          this.loadingInitial = false;
        });
      })
    }catch(error){
      console.log(error);
      runInAction('error loading',()=>{
        this.loadingInitial = false;
      })      
    };
  }

  @action createActivity = async(activity: IActivity)=>{
    this.submitting = true;
    try{
      await agent.Activities.create(activity);
      runInAction('Create activity',()=>{
        this.activityRegistery.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
       // this.editMode = false;
      });

    }catch(e){
      console.log(e);
      runInAction('Error create',()=>{
        this.submitting = false;
      })
    }
  }

  @action editActivity = async(activity: IActivity)=>{
    this.submitting = true;
    try{
      await agent.Activities.update(activity);
      runInAction('Edit activity',()=>{
        this.activityRegistery.set(activity.id, activity);
        this.activity = activity;
     //  this.editMode = false;
        this.submitting = false;
      });

    }catch(e){
      runInAction('Error edit',()=>{
        this.submitting = false; 
      });
      console.log(e);
    }
  }

  @action deleteActivity = async(event: SyntheticEvent <HTMLButtonElement>,id : string)=>{
    //tout bête on affiche ce qui est différent de la selection
    this.target = event.currentTarget.name;
    this.submitting = true;
    try{
     await agent.Activities.delete(id)
     // this.activities = this.activities.filter(a => a.id !== id);
     runInAction('delete Activity',()=>{
      this.activityRegistery.delete(id); 
      this.submitting = false;
      this.target = '';
      this.activity= null;
     });

    }catch(e){
      runInAction('error delete',()=>{
        this.submitting = false;
        this.target = '';
      });
      console.log(e);
    }
   //setTarget(event.currentTarget.name)
   // agent.Activities.delete(id).then(()=>{
   //   setActivities([...activities.filter(a => a.id !== id)])
   // }).then(()=>setSubmit(false));
  }

  @action selectActivity = (id: string)=>{
    // dans video .filter(a => a.id === id) et selectedActivity : IActivity | undefined
    //this.selectedActivity = this.activities.find(a => a.id === id);
    this.activity = this.activityRegistery.get(id);
  //  this.editMode = (false);
    this.loadingInitial = false;
  }

  @action loadActivity = async(id: string)=>{
    let activity = this.getActivity(id);
    // comme quand on passe par le routage, on se trouve en dehors de 
    //actitityDashboard
      // activityDetail est un enfant de actitityDashboard mais depuis 
      // route, on est extérieur et on n'a pas accès aux valeurs
      // on ne dispose que du lien cliqué :
      //http://localhost:3000/activities/475e485c-1330-4ae5-9ac2-5fbace2770fa
    if(activity){
      this.activity = activity;
      console.log(activity.title);
      // ici activity=null
    }else{// partie nécessaire si démarre avec un id et demarrage
      this.loadingInitial = true;
      try{
        activity = await agent.Activities.detail(id);
        runInAction('loading',()=>{
          this.selectActivity = activity;
          this.loadingInitial = false;
        })
        console.log("rien");
      }catch(e){
        console.log(e);
        runInAction('error load',()=>{
          this.loadingInitial = false;
        })
      }
    }
  }

  @action clearActivity = ()=>{
    this.activity = null;
  }

  getActivity = (id:string)=>{
    return this.activityRegistery.get(id);
  }

  // @action cancelSelectedActivity = ()=>{
  //   this.activity = null;
  // }

  // // @action createActivity(activity: IActivity){
  // //   this.submitting = true;
  // //   agent.Activities.create(activity);
  // // }
  // @action cancelOpenForm  = ()=>{
  //  // this.editMode = false;
  // }
  // @action openEditMode = (id: string)=>{
  //   this.activity = this.activityRegistery.get(id)
  //  // this.editMode = true;
  // }
  // @action openCreateMode = ()=>{
  //  // this.editMode = true;
  //   this.activity = null;
  // }
}

export default createContext(new ActivityStore())