import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from 'redux';
import savedMissionsReducer from './slices/savedMissionsSlice';
import createdExpeditionsReducer from './slices/createdExpeditionsSlice';

const rootReducer = combineReducers({
  savedMissions: savedMissionsReducer,
  createdExpeditions: createdExpeditionsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
