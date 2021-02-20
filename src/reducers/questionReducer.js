import { loadingQuestion, errorQuestion, scoreUser, allScoreType, getQuestion } from '../types/questionType';
import { PURGE } from 'redux-persist';

const INITIAL = {
	question: [],
	answer1: [],
	answer2: [],
	answerArray: [],
	correcId: [],
	cargando: false,
	status: '',
	error: '',
	message: '',
	info: [],
	score: [],
	allScore: [],
	userScore: []
};

export default (state = INITIAL, action) => {
	switch (action.type) {
		case loadingQuestion:
			return { ...state, cargando: true, error: '' };
		case errorQuestion:
			return { ...state, error: action.error, cargando: action.cargando };
		case getQuestion:
			return {
				...state,
				question: action.payload,
				answer1: action.answer1,
				answer2: action.answer2,
				answerArray: action.answerArray,
				correcId: action.correcId,
				cargando: action.cargando,
				error: '',
				message: ''
			};
		case scoreUser:
			return { ...state, score: action.score, cargando: action.cargando, error: '' };
		case allScoreType:
			return { ...state, allScore: action.allScore, userScore: action.userScore,  cargando: action.cargando, error: '' };
		case PURGE:
			return INITIAL;
		default:
			return state;
	}
};
