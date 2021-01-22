import {
	idSearchJob,
	searchJobText,
	getAllJobs,
	getJob,
	loadingJobs,
	applyDocument,
	applyMessage,
	errorJob
} from '../types/jobsTypes';
import { PURGE } from 'redux-persist';
const INITIAL = {
	jobs: null,
	job: null,
	jobId: null,
	document: null,
	message: null,
	cargando: false,
	error: ''
};
export default (state = INITIAL, action) => {
	switch (action.type) {
		case getAllJobs:
			return { ...state, jobs: action.payload, cargando: action.cargando };
		case applyDocument:
			return { ...state, document: action.document, cargando: action.cargando };
		case applyMessage:
			return { ...state, message: action.message, cargando: action.cargando };
		case searchJobText:
			return { ...state, jobs: action.payload, cargando: action.cargando };
		case loadingJobs:
			return { ...state, cargando: true };
		case errorJob:
			return { ...state, error: action.error, cargando: action.cargando };
		case getJob:
			return { ...state, job: action.payload, cargando: action.cargando, error: '', };
		case idSearchJob:
			return { ...state, jobId: action.payload.id, job: action.payload,};
		case PURGE:
			return INITIAL;
		default:
			return state;
	}
};
