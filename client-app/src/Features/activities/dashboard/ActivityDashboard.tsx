import React, { useContext, useEffect } from 'react'
import {Grid} from 'semantic-ui-react'
import ActivityList from './ActivityList'
import { observer } from 'mobx-react-lite'
import ActivityStores from '../../../App/stores/activityStore'
import LoadingComponent from '../../../App/layout/LoadingComponent'


// {activities} équivaut à props mais permet l'utilisation directement
// de activities et non props.activities
const ActivityDashboard: React.FC = () => {
    //const activityStore = useContext(ActivityStores);
            // ici on met {} car 2 variables
            const activityStore = useContext(ActivityStores)

            // useEffect appelé après chaque affichage
            useEffect(()=>{
             activityStore.loadActivities()}, [activityStore]);
          
            //c'est ici qu'on appelle le composant si loading = true
            if(activityStore.loadingInitial) return <LoadingComponent content='chargement en cours...'/>
          
    return (    
        <Grid>
            <Grid.Column width={10}>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Filtre posts</h2>
                {/* {selectedActivity && !editMode &&(
                    <ActivityDetail />
                )}
                {editMode &&
                <ActivityForm 
                    // le fait de créer une key permet de forcer le unmount
                    // et le réaffichage quand selectedActivity change
                    //selectedActivity && selectedActivity.id || 0 evite erreur si rien de sélectionné
                    key = {(selectedActivity && selectedActivity.id) || 0}                    
                    activity={selectedActivity!}
                />} */}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);
