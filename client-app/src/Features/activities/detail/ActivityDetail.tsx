import React from 'react'
import {Image, Card, Icon, Button, ButtonGroup, SearchCategory } from 'semantic-ui-react'
import { IActivity } from '../../../App/model/activity'
import { act } from 'react-dom/test-utils'


interface IProps{
  activity: IActivity;
  setEditMode:(editMode: boolean)=> void;
  setSelectedActivity:(activity: IActivity | null)=>void;
}

const ActivityDetail: React.FC<IProps> = ({activity, setEditMode,setSelectedActivity}) => {
    return (
        //  fluid pour que la carte prenne toute la place dispo
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>            
          </Card.Meta>

        </Card.Content>
        <Card.Content extra>
            <ButtonGroup fluid>
                <Button   
                  basic color='blue'
                  content= 'Editer'
                  onClick={()=>setEditMode(true)}
                />
     
            </ButtonGroup>
        </Card.Content>
      </Card>
    )
}

export default ActivityDetail
