import './App.css'

import React, { FC } from 'react'

import UserList from './components/UserList/UserList'
import UserProvider from './providers/UserProvider'

const App: FC = () => {
  return (
    <div className="App">
      <UserProvider>
        <UserList></UserList>
      </UserProvider>
    </div>
  )
}

export default App
