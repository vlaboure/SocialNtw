import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../App/model/activity'
import {v4 as uuid} from 'uuid'
import ActivityStore from '../../../App/stores/activityStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router'


interface detailParams{
    id:string;
}

const ActivityForm : React.FC<RouteComponentProps<detailParams>> = ({match, history}) => {
    
    const activityStore= useContext(ActivityStore);
    //#region 
    //   Remplace createActivity:(activity: IActivity)=>void;
    const {
        createActivity,
        cancelOpenForm,
        editActivity,
        submitting,
        activity: initialFormState,
        loadActivity,
        selectActivity,
    } = activityStore;

    //#endregion
    // const intitialiseForm = ()=>{
    //     //important evite de retourner un objet non créé
    //     if(initialFormState){
    //         return initialFormState    
    //     }else {
    //         return{
    //             id:'',
    //             title:'',
    //             description:'',
    //             category:'',
    //             date:'',
    //             city:'',
    //             venue:'',
    //         }
    //     }
    // }
    useEffect(()=>{
        selectActivity(match.params.id)
        initialFormState && setActivity(initialFormState)
    }, )

    const [activity, setActivity] = useState<IActivity>({
        id:'',
        title:'',
        description:'',
        category:'',
        date:'',
        city:'',
        venue:'',
    });
    


//sans typage : event : any
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
                    name={activity.id}
                    loading = {submitting}
                    floated = 'right' 
                    positive type = 'submit' 
                    content = 'Soumettre'  
                />                    
                <Button 
                    name={activity.id}
                    floated = 'right' 
                    negative type = 'button' 
                    content = 'Annuler'
                    onClick = {cancelOpenForm}
                />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)
