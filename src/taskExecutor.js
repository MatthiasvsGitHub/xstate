import axios from 'axios'
import {doneInvoke} from 'xstate';
import {  errorPlatform } from 'xstate/lib/actionTypes';


export const TaskExecutor = (_context, event) => {

    return(
    axios.get(event.url) 
    .then((res) => doneInvoke('taskExecutor', res.data))
    .catch((error) => errorPlatform('taskExecutor', error))
        )
}
