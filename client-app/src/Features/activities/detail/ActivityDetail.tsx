import React, { useContext } from 'react'
import {Image, Card, Icon, Button, ButtonGroup, SearchCategory } from 'semantic-ui-react'
import { IActivity } from '../../../App/model/activity'
import { act } from 'react-dom/test-utils'
import ActivityStores from '../../../App/stores/activityStores'
import { observer } from 'mobx-react-lite'


interface IProps{
//  activity: IActivity;
 // setEditMode:(editMode: boolean)=> void;
  setSelectedActivity:(activity: IActivity | null)=>void;
}

const ActivityDetail: React.FC<IProps> = ({setSelectedActivity}) => {
  const activityStore = useContext(ActivityStores); 
  const {selectedActivity: activity, cancelSelectedActivity, openEditMode} = activityStore;   
  return (
    //  fluid pour que la carte prenne toute la place dispo
    <Card fluid>
    <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{activity!.title}</Card.Header>
      <Card.Meta>
        <Card.Description>
            {activity!.description}
        </Card.Description>            
      </Card.Meta>

    </Card.Content>
    <Card.Content extra>
        <ButtonGroup fluid>
            <Button   
              basic color='blue'
              content= 'Editer'
              onClick={openEditMode}
            />
            <Button   
                  basic color='grey'
                  content= 'Annuler'
                  onClick={cancelSelectedActivity}
                />
        </ButtonGroup>
    </Card.Content>
  </Card>
)
}

export default observer(ActivityDetail)
