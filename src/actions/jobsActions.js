import {
    idSearchJob,
    searchJobText,
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
            method: "POST",
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
                payload: data.jobs,
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


export const getJobId = search => async dispatch => {
    dispatch({
        type: loadingJobs
    });
    try {
        const response = await fetch(`${apiUrl.link}/api/jobs`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${search}`
            }
        });
        const data = await response.json();
        console.log("jobsAll: ", data);
        console.log('response: ', response.ok);


        if (response.ok) {
            dispatch({
                type: getJob,
                payload: data.jobs,
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


export const setIdJobSearch = jobArray => async dispatch => {
    dispatch({
        type: idSearchJob,
        payload: jobArray
    });

};

export const searchTextInJobs = ( search, token) => async dispatch => {
  dispatch({
    type: loadingJobs
  });
  try {
    let dataForm = "_method=" + encodeURIComponent("POST");
    dataForm += "&search=" + encodeURIComponent(search);
    
    const response = await fetch(`${apiUrl.link}/api/jobs`, {
      method: "POST",
      headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				Authorization: `Bearer ${token}`,
			},
      body: dataForm
    });    
    const data = await response.json();    
    if (!response.ok) {
      dispatch({
        type: errorJob,
        error: "Error en busqueda de empleos, " + response.status,
        cargando: false
      });
    } else {
      dispatch({
        type: searchJobText,
        payload: data.jobs,
        cargando: false
      });
      console.log("job 2", data);
    }
  } catch (error) {
    dispatch({
      type: errorJob,
      error: error.message,
      cargando: false
    });
  }
};
