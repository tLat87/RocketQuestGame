import { createSlice } from '@reduxjs/toolkit';

const createdExpeditionsSlice = createSlice({
  name: 'createdExpeditions',
  initialState: [],
  reducers: {
    addExpedition: (state, action) => {
      state.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    removeExpedition: (state, action) =>
      state.filter(exp => exp.id !== action.payload),
  },
});

export const { addExpedition, removeExpedition } = createdExpeditionsSlice.actions;

export const selectCreatedExpeditions = (state) => state.createdExpeditions;

export default createdExpeditionsSlice.reducer;
