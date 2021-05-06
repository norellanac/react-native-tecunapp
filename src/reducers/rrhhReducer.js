import { getCompany, getNameCompany, getOtherCompany, loadingCompany, loadingCompanyOnlySendCertificate, loadingCompanyOnlySendVacation, errorCompany } from '../types/rrhhTypes';
import { PURGE } from 'redux-persist';


const INITIAL = {
    company: [],
    nameCompany: [],
    otherCompany: [],
    cargando: false,
    cargandoVacation: false,
    error: ''
}


export default ( state = INITIAL, action ) => {
    switch (action.type) {
        case getCompany:
            return { ...state, company: action.payload, error: '' };
        case getNameCompany:
            return { ...state, nameCompany: action.nameCompany, cargando: action.cargando, error: '' };
        case getOtherCompany:
            return { ...state, otherCompany: action.otherCompany, error: '' };
        case loadingCompany:
            return { ...state, error: '' };
        case loadingCompanyOnlySendCertificate:
            return { ...state, cargando: true, error: '' };

        case loadingCompanyOnlySendVacation:
            return { ...state, cargcargandoVacationando: true, error: '' };
        case errorCompany:
            return { ...state, error: action.error };
        case PURGE:
            return INITIAL;
        default:
            return state;
    }
}