import { observer } from 'mobx-react-lite'
import React, {useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import ActivityStores from '../../../App/stores/activityStore'
import { Link, NavLink } from 'react-router-dom'


const ActivityList : React.FC = () => {
    const activityStores = useContext(ActivityStores);
    const {activityByDate, selectActivity, deleteActivity, submitting, target} = activityStores;
    return (
        <Segment clearing>
            <Item.Group divided>            
{/* !! parenthése pour la fonction fléchée car plusieurs lignes                 */}
                {activityByDate.map(activity =>(
                    <Item key={activity.id} >
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{(activity.date)}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button
                                name={activity.id}
                                loading={target===activity.id && submitting}
                                floated='right'
                                content='Supprimer'
                                color='red'  
                                onClick={(e)=>deleteActivity(e,activity.id)}             
                            />
                            <Button 
                                as={NavLink} to = {`/activities/${activity.id}`}
                                floated='right'
                                content='Voir'
                                color='blue'                            
                            />
                            <Label content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>
                    </Item>
                ))}
   
        
            </Item.Group>
        </Segment>        
    )
}

export default observer(ActivityList)
