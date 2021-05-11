import { loadingQuestion, errorQuestion, allScoreType, scoreUser, getQuestion } from '../types/questionType';
import { apiUrl } from '../../App';

export const oneQuestion = (token) => async (dispatch) => {
	try {
		const response = await fetch(`${apiUrl.link}/api/question`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`
			}
		});

		dispatch({
			type: loadingQuestion
		});

		const data = await response.json();
		console.log('Que trae dataQuestion?: ', data);

		dispatch({
			type: getQuestion,
			payload: data.questionRandom,
			answer1: data.ansRand2,
			answer2: data.ansRand1,
			answerArray: data.ansOthers,
			correcId: data.correcId,
			message: data.message,
			cargando: false
		});
	} catch (error) {
		//console.log("Si llego aqui todo mal");
		dispatch({
			type: errorQuestion,
			error: error.message,
			cargando: false
		});
	}
};

export const answerQuestionAction = (flag, token) => async (dispatch) => {
	//console.log("Que llega en answerObject? ",answerObject);
	//console.log("Que llega en token? ",token);

	try {
		let dataForm = '_method=' + encodeURIComponent('POST');
		dataForm += '&flag=' + encodeURIComponent(flag);
		const response = await fetch(`${apiUrl.link}/api/scoreuser`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`
			},
			body: dataForm
		});

		const data = await response.json();

		console.log('Que trae dataAnswer?: ', data);
		//console.log("Que trae uniquedObjectStatus?: ",data.uniquedObject.status);
	} catch (error) {
		console.log('Si llego aqui es porque hay error: ', error.message);
		dispatch({
			type: errorQuestion,
			error: error.message,
			cargando: false
		});
	}
};

export const topScoreAction = (token) => async (dispatch) => {
	try {
		const response = await fetch(`${apiUrl.link}/api/score`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`
			}
		});

		dispatch({
			type: loadingQuestion
		});

		const data = await response.json();
		console.log('Que trae topScoreAction?: ', data);

		dispatch({
			type: scoreUser,
			score: data.score,
			cargando: false
		});
	} catch (error) {
		console.log('error en topScoreAction');
		dispatch({
			type: errorQuestion,
			error: error.message,
			cargando: false
		});
	}
};

export const allScoreActions = (token) => async (dispatch) => {
	try {
		const response = await fetch(`${apiUrl.link}/api/allScore`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`
			}
		});

		dispatch({
			type: loadingQuestion
		});

		const data = await response.json();
		//console.warn('Que trae allScoreActions?: ', data);

		dispatch({
			type: allScoreType,
			allScore: data.allScore,
            userScore: data.data,
			cargando: false
		});
	} catch (error) {
		console.error('error en allScoreActions', error);
		dispatch({
			type: errorQuestion,
			error: error.message,
			cargando: false
		});
	}
};
