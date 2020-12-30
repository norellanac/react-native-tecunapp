import { getAllStores, getStores, loadingStore, errorStore  } from '../types/storeType';
import { PURGE } from 'redux-persist';


const INITIAL = {
    stores: [],
    searchStores: [],
    cargando: false,
    error: ''
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case getAllStores:
            return { ...state, stores: action.payload, cargando: action.cargando, error: '' };
        case getStores:
            return { ...state, searchStores: action.payload, cargando: action.cargando, error: '' };
        case loadingStore:
            return { ...state, cargando: true, error: '' };
        case errorStore:
            return { ...state, error: action.error, cargando: action.cargando };
        case PURGE: 
            return INITIAL;
        default:
            return state;
    }
};