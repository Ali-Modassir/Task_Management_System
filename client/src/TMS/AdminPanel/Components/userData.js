import React,{useEffect,useState, useContext} from 'react'
import {useParams} from 'react-router-dom' ; 
import {List, ListItem, ListItemText, Typography, Card} from '@material-ui/core'

import './userData.css' ; 
import {useHttpClient} from '../../customHooks/http-hook' ; 
import {TaskContext} from '../../context/taskContext' ; 

const userData = ({tasks}) => {
    const taskContext = useContext(TaskContext) ; 
    const {sendRequest, isLoading} = useHttpClient() ; 
    const [tasks,setTasks] = useState([]) ; 
    const {userId} = useParams() ; 

    useEffect(() => {
      let mounted = true ; 
      sendRequest(process.env.REACT_APP_BASE_URL + "/dashboard/workspace/allTasks/" + userId).then(response => {
         if(mounted){
            setTasks(response) ; 
         }
      }).catch(err => console.log(err)) ; 
      return () => (mounted = false) ; 
    },[taskContext.allTasks, taskContext.allComments]) ; 

    if(!!tasks === false) {
        return (
            <List>
                <ListItem>
                    <Typography>
                        No Task Assigned
                    </Typography>
                </ListItem>
            </List>
        )
    }

    return (
        <Card>
            
           <List>
              {
                  tasks.map && tasks.map((task, index) => {
                      <ListItem key={index}>
                         <ListItemText>{task.taskName}</ListItemText>
                         <ListItemText>{task.taskType.title}</ListItemText>
                      </ListItem>
                  })
              }
           </List>
        </Card>
    )
}

export default userData
