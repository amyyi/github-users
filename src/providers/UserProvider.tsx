import React, { createContext, FC, useContext } from 'react'

import { initialUserReducer, UserReducer, useUserReducer } from '../stores/user/reducers'

interface Props {
  user: UserReducer
}

const Context = createContext<Props>({
  user: initialUserReducer,
})

const UserProvider: FC = ({ children }) => {
  const userReducer = useUserReducer()
  const data = { user: userReducer }
  return <Context.Provider value={data}>{children}</Context.Provider>
}

export default UserProvider
export const useUserStore = (): Props => useContext(Context)
