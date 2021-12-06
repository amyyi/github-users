import { Reducer as ReactReducer, useReducer } from 'react'

import { AppError } from '../../constants/errors'
import { initResUserDetail, initResUserList, ResUserDetail, ResUserList } from './../../apis/users'
import { USER_ACTION_TYPES, UserAction } from './actions'
import { UserDispatcher } from './dispatchers'

type UserDispatch = (dispatcher: UserDispatcher) => void

interface ApiStatus {
  error?: AppError
  isLoading: boolean
  isSuccess: boolean
}

const initialApiStatus = {
  error: undefined,
  isLoading: false,
  isSuccess: false,
}

export interface UserState {
  userList: {
    data: ResUserList
  } & ApiStatus
  userDetail: {
    data: ResUserDetail
  } & ApiStatus
}

export interface UserReducer {
  state: UserState
  dispatch: UserDispatch
}

const initialUserState: UserState = {
  userList: {
    data: initResUserList,
    ...initialApiStatus,
  },
  userDetail: {
    data: initResUserDetail,
    ...initialApiStatus,
  },
}

export const initialUserReducer = {
  state: { ...initialUserState },
  dispatch: (): void => {},
}

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case USER_ACTION_TYPES.GET_LIST_REQUEST: {
      return {
        ...state,
        userList: {
          ...state.userList,
          error: undefined,
          isLoading: true,
          isSuccess: false,
        },
      }
    }
    case USER_ACTION_TYPES.GET_LIST_SUCCESS: {
      return {
        ...state,
        userList: {
          ...state.userList,
          data: {
            data: action.payload,
          },
          error: undefined,
          isLoading: false,
          isSuccess: true,
        },
      }
    }
    case USER_ACTION_TYPES.GET_LIST_FAILURE: {
      return {
        ...state,
        userList: {
          ...state.userList,
          error: action.payload,
          isLoading: false,
          isSuccess: false,
        },
      }
    }
    case USER_ACTION_TYPES.GET_USER_DETAIL_REQUEST: {
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          error: undefined,
          isLoading: true,
          isSuccess: false,
        },
      }
    }
    case USER_ACTION_TYPES.GET_USER_DETAIL_SUCCESS: {
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          data: action.payload,
          error: undefined,
          isLoading: false,
          isSuccess: true,
        },
      }
    }
    case USER_ACTION_TYPES.GET_USER_DETAIL_FAILURE: {
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          error: action.payload,
          isLoading: false,
          isSuccess: false,
        },
      }
    }
    default:
      throw new Error()
  }
}

export const useUserReducer = (): UserReducer => {
  const [state, dispatch] = useReducer<ReactReducer<UserState, UserAction>>(
    userReducer,
    initialUserState,
  )
  const userDispatch = (dispatcher: UserDispatcher) => dispatcher(dispatch, state)
  return { state, dispatch: userDispatch }
}
