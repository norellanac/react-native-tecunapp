import {
    getAllJobs,
    getJob,
    loadingJobs,
    errorJob
} from '../types/jobsTypes';
import { PURGE } from 'redux-persist';
const INITIAL = {
	jobs: undefined,
	job: undefined,
	cargando: false,
	error: ''
};
export default (state = INITIAL, action) => {
	switch (action.type) {
		case getAllJobs:
			return { ...state, jobs: action.payload, cargando: action.cargando };
		case loadingJobs:
			return { ...state, cargando: true };
		case errorJob:
			return { ...state, error: action.error, cargando: action.cargando };
		case getJob:
			return { ...state, job: action.payload, cargando: action.cargando, error: '', };
		case PURGE:
			return INITIAL;
		default:
			return state;
	}
};
