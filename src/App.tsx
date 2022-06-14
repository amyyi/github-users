import './App.css'

import React, { FC } from 'react'

import UserList from './components/UserList/UserList'
import UserProvider from './providers/UserProvider'

const App: FC = () => {
  return (
    <div className="App">
      <UserProvider>
        <UserList></UserList>
        <div>domain: {process.env.REACT_APP_BACKEND_DOMAIN}</div>
      </UserProvider>
    </div>
  )
}

export default App
