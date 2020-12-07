import {
    getAllJobs,
    getJob,
    loadingJobs,
    errorJob
} from '../types/jobsTypes';
import { apiUrl } from './../../App';



export const getJobs = tokenUsr => async dispatch => {
    dispatch({
        type: loadingJobs
    });
    try {
        const response = await fetch(`${apiUrl.link}/api/jobs`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });
        const data = await response.json();
        console.log("jobsAll: ", data);
        console.log('response: ', response.ok);


        if (response.ok) {
            dispatch({
                type: getAllJobs,
                payload: data.data,
                cargando: false
            });
        }
    } catch (error) {
        console.log("error: ", error);
        dispatch({
            type: errorJob,
            error: error.message,
            cargando: false
        });
    }
};




export const logoutUser = () => dispatch => {
    /*dispara el evento y contacta al reducer  */
    dispatch({
        type: userLogout,
    });
};
