import React from 'react'
import {Grid} from 'semantic-ui-react'
import {IActivity} from '../../../App/model/activity'
import ActivityList from './ActivityList'
import ActivityDetail from '../detail/ActivityDetail'
import ActivityForm from '../form/ActivityForm'

// on peut aussi utiliser type Props
interface IProps {
    //tableau d'activités passées en paramètre à ActivityDashboard
    activities: IActivity[];
    selectActivity: (id: string)=>void;
    selectedActivity: IActivity;
    editMode : boolean;
    setEditMode: (editMode: boolean)=> void;
    setSelectedActvity: (activity: IActivity | null)=>void;
}

// {activities} équivaut à props mais permet l'utilisation directement
// de activities et non props.activities
const ActivityDashboard: React.FC<IProps> = ({
        activities, 
        selectActivity,
        selectedActivity, 
        editMode, 
        setEditMode,
        setSelectedActvity}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                    activities={activities}
                    selectActivity = {selectActivity}                                    
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode &&(
                    <ActivityDetail  
                        activity = {selectedActivity}
                        setEditMode = {setEditMode}
                        setSelectedActivity = {setSelectedActvity}
                    />
                )}
                {editMode &&
                <ActivityForm 
                    setEditMode ={setEditMode} 
                    activity={selectedActivity}
                />}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;
