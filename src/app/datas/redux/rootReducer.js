import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import { DashboardSlice } from "../_redux/DashboardSlice";

export const rootReducer = combineReducers({


  dashboard:DashboardSlice.reducer
});

export function* rootSaga() {}
