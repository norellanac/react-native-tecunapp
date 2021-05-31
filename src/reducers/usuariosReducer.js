import { getUser, loadingUser, errorUser, avatarUser, asotecsaInfo, getEmergencyNumber, sendSuggestions } from "../types/userTypes";
import { PURGE } from 'redux-persist';
const INITIAL = {
	token: '',
	user: [],
	cargando: false,
	registered: false,
	url_image: null,
	message: '',
	messageSuggestion: '',
	statusSuggestion: '',
	number: '',
	error: '',
};
export default (state = INITIAL, action) => {
	switch (action.type) {
		case loadingUser:
			return { ...state, cargando: true };
		case errorUser:
			return { ...state, error: action.error, cargando: action.cargando };
		case getUser:
			return { ...state, user: action.payload, token: action.token, cargando: action.cargando, error: '', };
		case avatarUser:
			return { ...state,  url_image: action.url_image, cargando: action.cargando, error: ''}
		case asotecsaInfo:
			return { ...state, message: action.message, cargando: action.cargando, error: ''}
		case getEmergencyNumber:
			return { ...state, number: action.number, cargando: action.cargando, error: ''}
		case sendSuggestions:
			return { ...state, messageSuggestion: action.message, statusSuggestion: action.status, cargando: action.cargando, error: ''}
		case PURGE:
			return INITIAL;
		default:
			return state;
	}
};
