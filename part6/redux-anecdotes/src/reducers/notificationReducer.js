import { createSlice } from '@reduxjs/toolkit'

let timeoutID

const noteSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
      createNotification(state, action) {
        if (state!=='')
          clearTimeout(timeoutID)
        return action.payload
      },
      resetNotification(state, action) {
        return ''
      }
    }
  })

export const {createNotification, resetNotification} = noteSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(createNotification(message))
    timeoutID = setTimeout(() => dispatch(resetNotification()), time*1000)
  }
}

export default noteSlice.reducer