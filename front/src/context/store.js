import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer.js';
import eventsReducer from './eventReducer.js';
import currentReducer from './currentReducer.js';

const store = configureStore({ reducer: {
    users: userReducer,
    events: eventsReducer,
    current: currentReducer
} });

export default store;