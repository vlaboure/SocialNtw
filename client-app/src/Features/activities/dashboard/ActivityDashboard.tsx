import React, {SyntheticEvent, useContext} from 'react'
import {Grid} from 'semantic-ui-react'
import {IActivity} from '../../../App/model/activity'
import ActivityList from './ActivityList'
import ActivityDetail from '../detail/ActivityDetail'
import ActivityForm from '../form/ActivityForm'
import { observer } from 'mobx-react-lite'
import ActivityStores from '../../../App/stores/activityStore'

// on peut aussi utiliser type Props
interface IProps {
//     //tableau d'activités passées en paramètre à ActivityDashboard
//     activities: IActivity[];
//     selectActivity: (id: string)=>void;
//     deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string)=>void;
//     //selectedActivity: IActivity;
//     //editMode : boolean;
//     //setEditMode: (editMode: boolean)=> void;
//     setSelectedActvity: (activity: IActivity | null)=>void;
//     //createActivity:(activity: IActivity)=>void;
//  //   editActivity:(actvity: IActivity)=>void;
//     submitting: boolean;
//     target: string;
}

// {activities} équivaut à props mais permet l'utilisation directement
// de activities et non props.activities
const ActivityDashboard: React.FC<IProps> = ({
       // activities, 
       // selectActivity,
       // deleteActivity,
       //selectedActivity, 
       // editMode, 
      //  setEditMode,
       // setSelectedActvity,
     //   createActivity,
    //    editActivity,
     //   submitting,
    //    target
    }) => {
    const activityStore = useContext(ActivityStores);
            // ici on met {} car 2 variables
    const {editMode, selectedActivity} = activityStore;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                    //activities={activities}
                   // selectActivity = {selectActivity}     
                  //  deleteActivity = {deleteActivity}   
                //    submitting = {submitting} 
                //    target = {target}                           
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&(
                    <ActivityDetail  
                        // activity = {selectedActivity}
                      //  setEditMode = {setEditMode}
                     //   setSelectedActivity = {setSelectedActvity}
                    />
                )}
                {editMode &&
                <ActivityForm 
                    // le fait de créer une key permet de forcer le unmount
                    // et le réaffichage quand selectedActivity change
                    //selectedActivity && selectedActivity.id || 0 evite erreur si rien de sélectionné
                    key = {(selectedActivity && selectedActivity.id) || 0}                    
              //      setEditMode ={setEditMode} 
                    activity={selectedActivity!}
             //     createActivity={createActivity}
             //       editActivity={editActivity}
             //       submitting = {submitting}   
                />}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);
