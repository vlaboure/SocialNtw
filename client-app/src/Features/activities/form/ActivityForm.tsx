import React, { useState } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../App/model/activity'

interface IProps{
    setEditMode : (editMode: boolean)=>void;
    _activity: IActivity;
}

const ActivityForm : React.FC<IProps> = ({setEditMode,_activity}) => {

    const intitialiseForm : React.FC<IProps> = ({_activity})=>{
        if(_activity){
            return _activity    
        }else {
            return{
                title:'',
                description:'',
                category:'',
                date:'',
                city:'',
                venue:'',
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(intitialiseForm)
    return (
        <Segment clearing>
            <Form>
                <Form.Input  placeholder = 'Titre'/>
                <Form.TextArea rows={2} placeholder = 'Description'/>
                <Form.Input placeholder = 'Catégorie'/>
                <Form.Input type = 'date' placeholder = 'Date'/>
                <Form.Input placeholder = 'Cité'/>
                <Form.Input placeholder = 'Localité'/>
                <Button 
                    floated = 'right' 
                    positive type = 'submit' 
                    content = 'Soumettre'/>
                <Button 
                    floated = 'right' 
                    negative type = 'button' 
                    content = 'Annuler'
                    onClick = {()=>setEditMode(false)}
                />
            </Form>
        </Segment>
    )
}

export default ActivityForm
