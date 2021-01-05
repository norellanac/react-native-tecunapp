import {
	errorPictures,
    loadingPictures,
    getAllPictures,
    getOnePicture,
} from '../types/picturesTypes';
import { apiUrl } from './../../App';

export const getPicturesAction = tokenUsr => async dispatch => {
    dispatch({
        type: loadingPictures
    });

    try {
        const response = await fetch(`${apiUrl.link}/api/pictures`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });

        //console.log("Response:", response);

        const data = await response.json();
        console.log("picture data?: ", data);
        console.log("picture Response:", response);

        if (response.ok) {
            dispatch({
                type: getAllPictures,
                payload: data.data,
                cargando: false
            });
        }

    } catch (error) {
        dispatch({
            type: errorPictures,
            error: error.message,
            cargando: false
        });
    }
}

