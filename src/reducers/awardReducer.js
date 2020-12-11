import { getAwards, getAllAwards, errorAwards, loadingAwards } from '../types/awardType';
import { PURGE } from 'redux-persist';


const INITIAL = {
    awards: [],
    pathImage: "",
    cargando: false,
    error: ''
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case getAllAwards:
            return { ...state, awards: action.payload, pathImage: action.pathImage, cargando: action.cargando };
        case loadingAwards:
            return { ...state, cargando: true };
        case errorAwards:
            return { ...state, error: action.error, cargando: action.cargando };
        case PURGE:
            return INITIAL;
        default:
            return state;
    }
};  