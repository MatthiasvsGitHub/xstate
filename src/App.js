import './App.css';
import { useState } from 'react';
import { useMachine } from '@xstate/react'
import { fetchMachine } from './taskMachine'
import { TaskExecutor} from './taskExecutor'

function App() {
  const [userId, setUserId] = useState('')
  const [state, send] = useMachine(fetchMachine, {
    services: {
      TaskExecutor
    },
    devTools: true
  })

  const handleSubmit = e => {
    send('FETCH', {
      url: `https://jsonplaceholder.typicode.com/users/${userId}`
    })
  }

  const handleCancel = e => {
    send('CANCEL')
  }

  return (
    <div className="App">

      <h1>Xstate Introduction :)</h1>
      <h2>JSON Placeholder Example</h2>

      <input onChange={((e) => setUserId(e.target.value))}placeholder='user ID'></input>
      <button onClick={handleSubmit}>Search for User</button>
      <button onClick={handleCancel}>Cancel</button>

      <br />
      <br />
      {state.matches('loading') && 'Loading...'}
      {state.matches('failure') && `Could not fetch user ${userId} (${state.context.error.message})`}
      {state.matches('success') && 
      <>
      Name: {state.context.value.data.name}<br/>
      Phone: {state.context.value.data.phone}
      </>}

    </div>
  );
}

export default App;
