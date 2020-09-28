import React, { useContext, useEffect } from 'react'
import {Image, Card, Button, ButtonGroup} from 'semantic-ui-react'
import ActivityStores from '../../../App/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { Link, RouteComponentProps } from 'react-router-dom'
import LoadingComponent from '../../../App/layout/LoadingComponent'

interface detailParams{
  id: string;
}

const ActivityDetail: React.FC<RouteComponentProps<detailParams>> = ({match , history}) => {
  const activityStore = useContext(ActivityStores); 
  const {
    selectActivity,
    activity,
    loadingInitial,
  } = activityStore;   
 
  useEffect(() => {
    selectActivity(match.params.id)
  }, [selectActivity,match.params.id])

  if (loadingInitial || !activity) return <LoadingComponent content='chargement détail'/>

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
              as= {Link} to = {`/manage/${activity.id}`}
            />
            <Button   
                  basic color='grey'
                  content= 'Annuler'
                  // history de RouteComponentProps
                  onClick={()=>history.push('/activities')}
                />
        </ButtonGroup>
    </Card.Content>
  </Card>
)
}

export default observer(ActivityDetail)
