import currentReducer from "./currentReducer";
import userReducer from "./reducer";
import eventReducer from "./eventReducer";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
    users: userReducer,
    current: currentReducer,
    events: eventReducer
})
