import { loadingQuestion, errorQuestion, messageAnswer, scoreUser, getQuestion } from '../types/questionType';
import { apiUrl } from '../../App';


export const oneQuestion = token => async dispatch => {
    try {
        const response = await fetch(`${apiUrl.link}/api/question`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: loadingQuestion
        });

        const data = await response.json();
        //console.log("Que trae dataQuestion?: ", data);

        dispatch({
            type:getQuestion,
            payload: data.questionRandom,
            answer1: data.ansRand2,
            answer2: data.ansRand1,
            answerArray: data.ansOthers,
            message: data.message,
            cargando: false,
        });

    } catch (error) {
        //console.log("Si llego aqui todo mal");
        dispatch({
            type: errorQuestion,
            error: error.message,
            cargando: false
        });
    }
}

export const answerQuestion = (answerObject, token) => async dispatch => {
    //console.log("Que llega en answerObject? ",answerObject);
    //console.log("Que llega en token? ",token);

    try {
        let json = JSON.stringify(answerObject);
        let params = 'json='+json;

        let dataForm = "_method=" + encodeURIComponent("POST");
        dataForm += "&json=" + encodeURIComponent(answerObject);

        //console.log("Llego aqui antes de hacer la peticion?");

        const response = await fetch(`${apiUrl.link}/api/scoreuser`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: `Bearer ${token}`,
                Params: `json ${dataForm}`,
            },
            body: params
        });

        dispatch({
            type: loadingQuestion
        });

        const data = await response.json();

        console.log("Que trae dataAnswer?: ",data);
        //console.log("Que trae uniquedObjectStatus?: ",data.uniquedObject.status);

        dispatch({
            type: messageAnswer,
            message: data.message,
            status: data.uniquedObject.status,
            info: data.uniquedObject,
            cargando: false
        });

    } catch (error) {
        console.log("Si llego aqui es porque hay error: ",error.message);
        dispatch({
            type: errorQuestion,
            error: error.message,
            cargando: false
          });
    }   
}

export const allScoreUser = token => async dispatch => {
    try {
        const response = await fetch(`${apiUrl.link}/api/score`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: loadingQuestion
        });

        const data = await response.json();
        //console.log("Que trae dataQuestion?: ", data);

        dispatch({
            type:scoreUser,
            score: data.score,
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
}