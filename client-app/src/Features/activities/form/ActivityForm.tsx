import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
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
        editActivity,
        submitting,
        activity: initialFormState,
        loadActivity,
        selectActivity,
        clearActivity
    } = activityStore;

    useEffect(()=>{
        if(match.params.id && activity== null)
            selectActivity(match.params.id)
        initialFormState && setActivity(initialFormState)
        // ici on veut nettoyer pour si on clique sur create dans edit
        //on appelle une fonction que l'on crée ds activityStore
        return ()=>{
            clearActivity();
        }
    },[loadActivity,match.params.id,clearActivity, initialFormState])

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
        setActivity({...activity,[name] : value});  
        console.log(value);
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
            createActivity(newActivity).then(()=>history.push(`/activities/${newActivity.id}`));
        }else{
            editActivity(activity).then(()=>history.push(`/activities/${activity.id}`));;
        }
    }

    return (

        <Grid>
            <Grid.Column width={10}>
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
                            onClick={()=>history.push('/activities')}
                        />
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>

    )
}

export default observer(ActivityForm)
