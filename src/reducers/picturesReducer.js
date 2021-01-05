import {
	errorPictures,
    loadingPictures,
    getAllPictures,
    getOnePicture,
} from '../types/picturesTypes';
import { PURGE } from 'redux-persist';
const INITIAL = {
	pictures: '',
	cargando: false,
	error: '',
	url: false,
};
export default (state = INITIAL, action) => {
	switch (action.type) {
		case getAllPictures:
			return { ...state, pictures: action.payload, cargando: action.cargando, error: '' };
		case loadingPictures:
			return { ...state, cargando: true, error: '' };
		case errorPictures:
			return { ...state, error: action.error, cargando: action.cargando };
		case PURGE:
			return INITIAL;
		default:
			return state;
	}
};
