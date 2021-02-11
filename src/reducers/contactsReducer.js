import { getAllContacts, loadingContacts, errorContacts, clearContacts, favorites } from '../types/contactsTypes';
import { PURGE } from 'redux-persist';
const INITIAL = {
	contacts: [],
	favorites: null,
};
export default (state = INITIAL, action) => {
	switch (action.type) {
		case loadingContacts:
			return { ...state, cargando: true, error: '' };
		case errorContacts:
			return { ...state, error: action.error, cargando: action.cargando };
		case getAllContacts:
			return { ...state, contacts: action.payload, cargando: action.cargando, error: '' };
		case favorites:
			return { ...state, favorites: action.payload, cargando: action.cargando, error: '' };
		case clearContacts:
			return { ...state, contacts: [], cargando: false, error: '' };
		case PURGE:
			return INITIAL;
		default:
			return state;
	}
};
