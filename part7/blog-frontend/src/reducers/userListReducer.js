import { createSlice } from '@reduxjs/toolkit'
import userListService from '../services/users'

const userListSlice = createSlice({
  name: 'userList',
  initialState: [],
  reducers: {
    setUserList(state, action) {
      return action.payload
    },
  },
})

export const { setUserList } = userListSlice.actions

export const getAllUsers = () => {
  return async dispatch => {
    const userList = await userListService.getAll()
    dispatch(setUserList(userList))
  }
}

export default userListSlice.reducer
