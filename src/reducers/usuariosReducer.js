import {
	loginTypes,
	cargandoLogin,
	errorLogin,
	getUser,
	userLogout,
	registerUser,
	updatePass,
	updatePhon
} from '../types/loginTypes';
import { PURGE } from 'redux-persist';
const INITIAL = {
	token: '',
	user: [],
	wallet: [],
	cargando: false,
	registered: false,
	error: '',
	updatePa: '',
	updatePh: ''
};
export default (state = INITIAL, action) => {
	switch (action.type) {
		case loginTypes:
			return { ...state, token: action.tokenUser, cargando: action.cargando };
		case cargandoLogin:
			return { ...state, cargando: true };
		case errorLogin:
			return { ...state, error: action.error, cargando: action.cargando };
		case getUser:
			return { ...state, user: action.payload, wallet: action.wallet, cargando: action.cargando };
		case userLogout:
			return {
				...state,
				token: undefined,
				user: [],
				wallet: [],
				cargando: false,
				error: '',
				updatePa: '',
				updatePh: ''
			};
		case registerUser:
			return { ...state, registered: true, cargando: action.cargando };
		case updatePass:
			return { ...state, updatePa: action.payload, cargando: action.cargando };
		case updatePhon:
			return { ...state, updatePh: action.payload, cargando: action.cargando };
		case PURGE:
			return INITIAL;
		default:
			return state;
	}
};
