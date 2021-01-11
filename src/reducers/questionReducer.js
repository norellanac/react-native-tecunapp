import {loadingQuestion, errorQuestion, scoreUser, messageAnswer, getQuestion} from '../types/questionType';
import {PURGE} from 'redux-persist';


const INITIAL = {
    question: [],
    answer1: [],
    answer2: [],
    answerArray: [],
    cargando: false,
    status: '',
    error: '',
    message: '',
    info: [],
    score: []
};

export default (state = INITIAL, action) => {
    switch(action.type) {
        case loadingQuestion:
            return { ...state, cargando: true };
        case errorQuestion:
            return { ...state, error: action.error, cargando: action.cargando };
        case getQuestion:
            return { 
                ...state, 
                question: action.payload, 
                answer1: action.answer1, 
                answer2: action.answer2, 
                answerArray: action.answerArray, 
                cargando: action.cargando 
            };
        case messageAnswer:
            return { ...state, message:action.message, info:action.info, status:action.status, cargando: action.cargando};
        case scoreUser:
            return { ...state, score: action.score, cargando: action.cargando };
        case PURGE:
            return INITIAL;
        default:
            return state;
    }
}