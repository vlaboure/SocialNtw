import React, { useState, FormEvent, useContext } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../App/model/activity'
import {v4 as uuid} from 'uuid'
import ActivityStores from '../../../App/stores/activityStores'


interface IProps{
   // setEditMode : (editMode: boolean)=>void;
    activity: IActivity;
    createActivity:(activity: IActivity)=>void;
    editActivity:(actvity: IActivity)=>void;
    submitting:boolean;
}

const ActivityForm : React.FC<IProps> = ({
  //  setEditMode,
    activity: initialFormState,
    createActivity,
    editActivity,
    submitting}) => {

    const intitialiseForm = ()=>{
        //important evite de retourner un objet non créé
        if(initialFormState){
            return initialFormState    
        }else {
            return{
                id:'',
                title:'',
                description:'',
                category:'',
                date:'',
                city:'',
                venue:'',
            }
        }
    }
//sans tupage : event : any
    const handlInputChange = (event :FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        //pour simplifier l'écriture et éviter le envent.target
        const {name, value}= event.currentTarget;
        setActivity({...activity,[name] : value})
    }
    
//pour le soumettre :
    const handleSubmit = ()=>{
        // provisoire
        //si id null  CREATION sinon EDITION
        if(activity.id.length ===0){
            //creation
            let newActivity= {
                ...activity,
                id : uuid()//pour le guid
            }
            createActivity(newActivity);
        }else{
            editActivity(activity);
        }
    }
    const activityStores = useContext(ActivityStores);
    const {selectActivity} = activityStores;
    const [activity, setActivity] = useState<IActivity>(intitialiseForm);
    return (
        <Segment clearing>
            {/* sauvegarde -- onSubmit */}
            <Form onSubmit = {handleSubmit}>
                <Form.Input 
                    onChange={handlInputChange} 
                    name='title'
                    placeholder = 'Titre' 
                    value = {activity.title}/>
                <Form.TextArea 
                    onChange={handlInputChange} 
                    name='description'
                    rows={2} placeholder = 'Description'
                    value = {activity.description}/>
                <Form.Input 
                    onChange={handlInputChange} 
                    name='category'
                    placeholder = 'Catégorie' 
                    value = {activity.category}/>
                <Form.Input 
                    onChange={handlInputChange} 
                    name='date'
                    type = 'dateTime-local' 
                    placeholder = 'Date' 
                    value = {activity.date}/>
                <Form.Input 
                    onChange={handlInputChange} 
                    name='city'
                    placeholder = 'Cité' 
                    value = {activity.city}/>
                <Form.Input 
                    onChange={handlInputChange} 
                    name='venue'
                    placeholder = 'Localité' 
                    value = {activity.venue}/>
                <Button 
                    loading = {submitting}
                    floated = 'right' 
                    positive type = 'submit' 
                    content = 'Soumettre'                   
                />                    
                <Button 
                    name={activity.id}
                    loading = {submitting}
                    floated = 'right' 
                    negative type = 'button' 
                    content = 'Annuler'
               //     onClick = {()=>setEditMode(false)}
                />
            </Form>
        </Segment>
    )
}

export default ActivityForm
