import axios, { AxiosResponse } from 'axios'
import {IActivity} from '../model/activity'

// définition du chemin de base pour les requêtes
axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = (response : AxiosResponse)=>response.data;
// pour les délais
//#region 
/*
    DU CHARABIA !!!!!
    JE PIGE QUE DALLE !!!!!!
*/
//#endregion
const sleep = (ms: number)=>(response: AxiosResponse)=>new Promise<AxiosResponse> (
resolve=>setTimeout(()=>resolve(response),ms));

const resquests= {
    //requêtes axios
    get : (url : string)=>axios.get(url).then(sleep(1000)).then(responseBody),
    post : (url : string, body: {})=>axios.post(url,body).then(sleep(3000)).then(responseBody),
    put :  (url : string, body: {})=>axios.put(url,body).then(sleep(3000)).then(responseBody),
    del : (url : string)=>axios.delete(url).then(sleep(3000)).then(responseBody)
}

const Activities = {
    //méthodes ultilisées pour le requêtes
    list : (): Promise<IActivity[]>=>resquests.get('/activities'),
    detail : (id : string)=>resquests.get(`/activities/${id}`),
    create  : (activity : IActivity)=>resquests.post('/activities',activity),
    update : (activity : IActivity)=>resquests.put('activities',activity),
    delete : (id : string)=>resquests.del(`/activities/${id}`)
} 

export default {
    Activities
}