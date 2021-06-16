import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../modules/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(()=> {
    axios.get<Activity[]>('https://localhost:5001/api/activities').then(response => {
    console.log(response);
    setActivities(response.data);
    })
  })

function HandleSelectActivity(id: string){
  setSelectedActivity(activities.find(x=>x.id ===id));
}

function HandleCancelSelectActivity(){
  setSelectedActivity(undefined);
}

function HandleFormOpen(id?: string){
  id ? HandleSelectActivity(id) : HandleCancelSelectActivity();
  setEditMode(true);

}

function HandleFormClose(){
  setEditMode(false);
}

function handleCreateOrEditActivity(activity: Activity){
  activity.id ? setActivities([...activities.filter(x=>x.id !== activity.id), activity])
  : setActivities([...activities, {...activity, id: uuid()}]);

  setEditMode(false);
  setSelectedActivity(activity);
}

function handleDeleteActivity(id: string){
  setActivities([...activities.filter(x=>x.id!== id)])
}

  return (
    <>
     <NavBar openForm={HandleFormOpen}/>
     <Container style={{marginTop: '7em'}}>
       <ActivityDashboard activities={activities} 
       selectedActivity={selectedActivity}
       selectActivity={HandleSelectActivity}
       cancelSelectActivity={HandleCancelSelectActivity}
       editMode={editMode}
       openForm={HandleFormOpen}
       closeForm={HandleFormClose}
       createOrEdit={handleCreateOrEditActivity}
       deleteActivity={handleDeleteActivity}
       />
        </Container>              
    </>
  );
}

export default App;
