import React from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import {IActivity} from '../../../App/model/activity'


interface IProps {
    //tableau d'activités passées en paramètre à ActivityDashboard
    activities: IActivity[];
    selectActivity: (id: string)=>void;
}

const ActivityList : React.FC<IProps> = ({activities, selectActivity}) => {
    return (
        <Segment clearing>
            <Item.Group divided>            
{/* !! parenthése pour la fonction fléchée car plusieurs lignes                 */}
                {activities.map(activity =>(
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
                                floated='right'
                                content='Voir'
                                color='blue'
                                onClick={() => selectActivity(activity.id)}
                            />
                            <Label content='Catégorie'/>
                        </Item.Extra>
                    </Item.Content>
                    </Item>
                ))}
   
        
            </Item.Group>
        </Segment>        
    )
}

export default ActivityList
