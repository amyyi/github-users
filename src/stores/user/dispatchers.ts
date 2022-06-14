import { Dispatch } from 'react'
import { first } from 'rxjs'

import * as api from './../../apis/users'
import { USER_ACTION_TYPES, UserAction } from './actions'
import { UserState } from './reducers'
export type UserDispatcher = (dispatch: Dispatch<UserAction>, state: UserState) => void

// var test = (v1) => (v2) => (`${v1}${v2}`)
// var test2 = (fn) => fn('3388')
// test2(test('hihi')) // hihi3388
export const getUserList: (parameters: api.ParamsUserList) => UserDispatcher =
  (payload) => (dispatch) => {
    dispatch({ type: USER_ACTION_TYPES.GET_LIST_REQUEST })
    return api
      .getUserList(payload)
      .pipe(first())
      .subscribe({
        next: (data) => {
          dispatch({ type: USER_ACTION_TYPES.GET_LIST_SUCCESS, payload: data })
        },
        error: (error) => {
          dispatch({ type: USER_ACTION_TYPES.GET_LIST_FAILURE, payload: error })
        },
      })
  }

export const getUserDetail: (parameters: string) => UserDispatcher = (payload) => (dispatch) => {
  dispatch({ type: USER_ACTION_TYPES.GET_USER_DETAIL_REQUEST })
  return api
    .getUserDetail(payload)
    .pipe(first())
    .subscribe({
      next: (data) => dispatch({ type: USER_ACTION_TYPES.GET_USER_DETAIL_SUCCESS, payload: data }),
      error: (error) =>
        dispatch({ type: USER_ACTION_TYPES.GET_USER_DETAIL_FAILURE, payload: error }),
    })
}
