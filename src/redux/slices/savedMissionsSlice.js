import { createSlice } from '@reduxjs/toolkit';

const savedMissionsSlice = createSlice({
  name: 'savedMissions',
  initialState: {
    missions: [],
  },
  reducers: {
    addMission: (state, action) => {
      const exists = state.missions.find(m => m.id === action.payload.id);
      if (!exists) {
        state.missions.push(action.payload);
      }
    },
    removeMission: (state, action) => {
      state.missions = state.missions.filter(m => m.id !== action.payload);
    },
    clearMissions: (state) => {
      state.missions = [];
    }
  }
});

export const { addMission, removeMission, clearMissions } = savedMissionsSlice.actions;

export const selectSavedMissions = state => state.savedMissions.missions;

export default savedMissionsSlice.reducer;
