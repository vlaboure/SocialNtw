import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {IActivity} from '../../../App/model/activity'

interface IProps{
    activity : IActivity;
}

const ItemActivityList : React.FC<IProps> = ({activity}) => {
    return (
        <Item key={activity.id} >
            <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{(activity.date)}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                    {/* <Button
                        name={activity.id}
                        loading={target===activity.id && submitting}
                        floated='right'
                        content='Supprimer'
                        color='red'  
                        onClick={(e)=>deleteActivity(e,activity.id)}             
                    /> */}
                    <Button 
                        as={Link} to = {`/activities/${activity.id}`}
                        floated='right'
                        content='Voir'
                        color='blue'                            
                    />
                    <Label content={activity.category}/>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default ItemActivityList
