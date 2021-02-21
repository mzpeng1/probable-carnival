import {persistStore, persistReducer} from 'redux-persist';
import {createStore} from 'redux';
import rootReducer from "./rootReducer";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer);
export const persistor = persistStore(store);
export default store;