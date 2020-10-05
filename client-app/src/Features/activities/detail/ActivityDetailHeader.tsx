import React from 'react'
import {Image, Segment, Button, Item, Header} from 'semantic-ui-react'
import { IActivity } from '../../../App/model/activity';
import {Link} from 'react-router-dom'
const activityImageStyle = {
  filter: 'brightness(30%)'
};
// style appliqué au segment au texte de Header
const activityImageTextStyle = {
  // position : absolute --> pour positionner le texte dans image
  position: 'absolute',
  bottom: '50%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const ActivityDetailHeader: React.FC<{activity : IActivity}> = ({activity}) => {
    return (
            <Segment.Group>
              <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid />
                <Segment basic style={activityImageTextStyle}>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Header
                          size='huge'
                          content={activity.title}
                          style={{ color: 'white' }}
                        />
                        <p>Date</p>
                        <p>
                          Hosted by <strong>Bob</strong>
                        </p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
              <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right'
                  as= {Link} to = {`/manage/${activity.id}`}>
                  Editer
                </Button>
              </Segment>
            </Segment.Group>
    )
}

export default ActivityDetailHeader
