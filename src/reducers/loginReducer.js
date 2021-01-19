import { errorLogin, logIn, logOut, ldapType, loadingLogin } from '../types/loginTypes';
import { PURGE } from 'redux-persist';
const INITIAL = {
	token: '',
	cargando: false,
	error: '',
	isAuth: false,
	isLdap: false,
};
export default (state = INITIAL, action) => {
	switch (action.type) {
		case logIn:
			return { ...state, token: action.tokenUser, cargando: action.cargando, isAuth: true, error: '' };
		case ldapType:
			return { ...state, isLdap: action.payload, cargando: action.cargando, error: '' };
		case loadingLogin:
			return { ...state, cargando: true };
		case errorLogin:
			return { ...state, error: action.error, cargando: action.cargando, isLdap: false };
		case PURGE:
			return INITIAL;
		default:
			return state;
	}
};
