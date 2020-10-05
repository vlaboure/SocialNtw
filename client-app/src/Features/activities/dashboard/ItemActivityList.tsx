import React from 'react'
import { Item, Button, Segment, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {IActivity} from '../../../App/model/activity'



const ItemActivityList : React.FC<{activity: IActivity}> = ({activity}) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                <Item>
                    <Item.Image size='tiny' circular src='/assets/user.png' />
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                     </Item.Content>
                    <Item.Description >
                        <h4> {activity.category}</h4>
                       
                    </Item.Description>
                </Item>
                </Item.Group>
 
            </Segment>
            <Segment>
                <Icon name='clock'/>{activity.date} 
                <Icon style= {{marginLeft: '2rem'}} name='marker'/>{activity.venue},{activity.city}
            </Segment>
            <Segment secondary>Participants ...</Segment>
            <Segment clearing>
                <span> {activity.description}</span>
                <Button 
                    as={Link} to = {`/activities/${activity.id}`}
                    floated='right'
                    content='Voir'
                    color='blue'  
                />
              
            </Segment>
        </Segment.Group>

    )
}

export default ItemActivityList
