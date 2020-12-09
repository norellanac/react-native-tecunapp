import { getAllStore, getStore, loadingStore, errorStore } from '../types/storeType';
import { PURGE } from 'redux-persist';


const INITIAL = {
    stores: [],
    cargando: false,
    error: ''
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case getAllStore:
            return { ...state, stores: action.payload, cargando: action.cargando };
        case loadingStore:
            return { ...state, cargando: true };
        case errorStore:
            return { ...state, error: action.error, cargando: action.cargando };
        case PURGE: 
            return INITIAL;
        default:
            return state;
    }
};