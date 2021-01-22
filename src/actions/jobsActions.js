import { EncodingType } from "expo-file-system";
import {
  idSearchJob,
  searchJobText,
  applyDocument,
  applyMessage,
  getAllJobs,
  getJob,
  loadingJobs,
  errorJob,
} from "../types/jobsTypes";
import * as DocumentPicker from "expo-document-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { apiUrl } from "./../../App";

export const getJobs = (tokenUsr) => async (dispatch) => {
  dispatch({
    type: loadingJobs,
  });
  try {
    const response = await fetch(`${apiUrl.link}/api/jobs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Authorization: `Bearer ${tokenUsr}`,
      },
    });
    const data = await response.json();
    //console.log("jobsAll: ", data);
    //console.log('response: ', response.ok);

    if (response.ok) {
      dispatch({
        type: getAllJobs,
        payload: data.jobs,
        cargando: false,
      });
    }
  } catch (error) {
    //console.log("error: ", error);
    dispatch({
      type: errorJob,
      error: error.message,
      cargando: false,
    });
  }
};

export const getJobId = (search) => async (dispatch) => {
  dispatch({
    type: loadingJobs,
  });
  try {
    const response = await fetch(`${apiUrl.link}/api/jobs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Authorization: `Bearer ${search}`,
      },
    });
    const data = await response.json();
    //console.log("jobsAll: ", data);
    //console.log('response: ', response.ok);

    if (response.ok) {
      dispatch({
        type: getJob,
        payload: data.jobs,
        cargando: false,
      });
    }
  } catch (error) {
    //console.log("error: ", error);
    dispatch({
      type: errorJob,
      error: error.message,
      cargando: false,
    });
  }
};

export const setIdJobSearch = (jobArray) => async (dispatch) => {
  dispatch({
    type: idSearchJob,
    payload: jobArray,
  });
};

export const searchTextInJobs = (search, token) => async (dispatch) => {
  dispatch({
    type: loadingJobs,
  });
  try {
    let dataForm = "_method=" + encodeURIComponent("POST");
    dataForm += "&search=" + encodeURIComponent(search);

    const response = await fetch(`${apiUrl.link}/api/jobs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: dataForm,
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch({
        type: errorJob,
        error: "Error en busqueda de empleos, " + response.status,
        cargando: false,
      });
    } else {
      dispatch({
        type: searchJobText,
        payload: data.jobs,
        cargando: false,
      });
      //console.log("job 2", data);
    }
  } catch (error) {
    dispatch({
      type: errorJob,
      error: error.message,
      cargando: false,
    });
  }
};

export const UploadDocument = (objectDocument, email, token) => async (
  dispatch
) => {
  console.log("Como vienen los elementos? ", objectDocument);

  dispatch({
    type: loadingJobs,
  });

  try {
    console.log("entra a try");
    let uri = objectDocument.uri;
    let nameStart = uri.indexOf("DocumentPicker/");
    let name = uri.substring(nameStart + 15, uri.length);
    let type = 'application/pdf';

    /* let dataForm = '_method=' + encodeURIComponent('POST');
		dataForm += '&document=' + encodeURIComponent(name);
    dataForm += '&document=' + encodeURIComponent(objectDocument.name);
    dataForm += '&document' + encodeURIComponent(uri);
    dataForm += '&document' + encodeURIComponent('pdf');
    dataForm += '&document' + encodeURIComponent(objectDocument.size);
    dataForm += '&email' + encodeURIComponent(email); */

    /* let dataForm = new FormData(objectDocument);
    //dataForm.append(objectDocument); */

    let file = {
      uri,            // e.g. 'file:///path/to/file/image123.jpg'
      name,            // e.g. 'image123.jpg',
      type             // e.g. 'image/jpg'
    }
    
    const body = new FormData()
    body.append('document', file)
    
    /* fetch(url, {
      method: 'POST',
      body
    }) */

    console.log("Que viene en body ",body);

    const response = await fetch(`${apiUrl.link}/api/job/apply/upload/${email}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          Params: `document ${body}`
        },
        body
      }
    );

    const data = await response.json();

    console.log("Que trae data? ", data);

    if (!response.ok) {
      dispatch({
        type: errorJob,
        error: "Error al cargar documento, " + response.status,
        cargando: false,
      });
    } else {
      console.log("response file", response);

      dispatch({
        type: applyDocument,
        payload: data.message,
        cargando: false,
      });
    }
  } catch (error) {
    console.log("catch file ", error);
    dispatch({
      type: errorJob,
      error: error.message,
      cargando: false,
    });
  }
};
