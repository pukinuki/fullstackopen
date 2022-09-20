import { createSlice } from '@reduxjs/toolkit'

let timeoutID

const noteSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    createNotification(state, action) {
      if (state.message !== '') clearTimeout(timeoutID)
      return action.payload
    },
    resetNotification() {
      return { message: '', type: '' }
    },
  },
})

export const { createNotification, resetNotification } = noteSlice.actions

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(createNotification(notification))
    timeoutID = setTimeout(() => dispatch(resetNotification()), time * 1000)
  }
}

export default noteSlice.reducer
