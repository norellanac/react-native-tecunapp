import { getAllAwards, loadingAwards, errorAwards } from '../types/awardType';
import { apiUrl } from '../../App';


export const getAwards = tokenUsr => async dispatch => {
    dispatch({
        type: loadingAwards
    });

    try{
        const response = await fetch(`${apiUrl.link}/api/award`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });

        const data = await response.json();
        /*console.log("awardsAll: ", data.award);
        console.log("pathImage: ", data.pathImage);
        console.log("response: ", response.ok);*/

        if (response.ok) {
            dispatch({
                type: getAllAwards,
                payload: data.award,
                pathImage: data.pathImage,
                cargando: false
            });
        }
    }catch (error) {
        console.log("error: ", error);
        dispatch({
            type: errorAwards,
            error: error.message,
            cargando: false
        });
    }
};