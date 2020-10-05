import { observer } from 'mobx-react-lite'
import React, {Fragment, useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import ActivityStores from '../../../App/stores/activityStore'
import { Link, NavLink } from 'react-router-dom'
import ItemActivityList from './ItemActivityList'

const ActivityList : React.FC = () => {
    const activityStores = useContext(ActivityStores);
    const {activityByDate} = activityStores;
    return (
        <Fragment>
            {activityByDate.map(([group, activities])=>(
                // fonctionne aussi sans la key
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                    {group}
                    </Label>
                    <Item.Group divided>            
            {/*ici .. dans la vidéo, il y a aussi key={activity.id}               */}
                        {activities.map(activity =>(
                            <ItemActivityList activity={activity}/>        
                        ))}                    
                    </Item.Group>
                </Fragment>
     
            ))}
        </Fragment>
      
    )
}

export default observer(ActivityList)
