import {
	errorLogin,
    logIn,
    logOut,
    loadingLogin
} from '../types/loginTypes';
import { PURGE } from 'redux-persist';
const INITIAL = {
	token: '',
	cargando: false,
	error: '',
	isAuth: false,
};
export default (state = INITIAL, action) => {
	switch (action.type) {
		case logIn:
			return { ...state, token: action.tokenUser, cargando: action.cargando, isAuth: true, error: '' };
		case loadingLogin:
			return { ...state, cargando: true };
		case errorLogin:
			return { ...state, error: action.error, cargando: action.cargando };
		case PURGE:
			return INITIAL;
		default:
			return state;
	}
};
