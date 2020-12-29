import { getAllContacts, loadingContacts, errorContacts, clearContacts } from "../types/contactsTypes";
import { PURGE } from 'redux-persist';
const INITIAL = {
	contacts: [],
};
export default (state = INITIAL, action) => {
	switch (action.type) {
		case loadingContacts:
			return { ...state, cargando: true };
		case errorContacts:
			return { ...state, error: action.error, cargando: action.cargando };
		case getAllContacts:
			return { ...state, contacts: action.payload, cargando: action.cargando, error: '', };
		case clearContacts:
			return { ...state, contacts: [] };
		case PURGE:
			return INITIAL;
		default:
			return state;
	}
};
