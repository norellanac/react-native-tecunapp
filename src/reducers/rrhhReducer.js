import { getCompany, getNameCompany, getOtherCompany, loadingCompany, errorCompany } from '../types/rrhhTypes';
import { PURGE } from 'redux-persist';


const INITIAL = {
    company: [],
    nameCompany: [],
    otherCompany: [],
    cargando: false,
    error: ''
}


export default ( state = INITIAL, action ) => {
    switch (action.type) {
        case getCompany:
            return { ...state, company: action.payload, cargando: action.cargando, error: '' };
        case getNameCompany:
            return { ...state, nameCompany: action.nameCompany, cargando: action.cargando, error: '' };
        case getOtherCompany:
            return { ...state, otherCompany: action.otherCompany, cargando: action.cargando, error: '' };
        case loadingCompany:
            return { ...state, cargando: true, error: '' };
        case errorCompany:
            return { ...state, error: action.error, cargando: action.cargando };
        case PURGE:
            return INITIAL;
        default:
            return state;
    }
}