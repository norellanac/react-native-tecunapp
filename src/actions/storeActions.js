import { getAllStores, getStores, loadingStore, errorStore  } from '../types/storeType';
import { apiUrl } from './../../App';


export const getAllStoresAction = tokenUsr => async dispatch => {
    dispatch({
        type: loadingStore
    });

    try {
        const response = await fetch(`${apiUrl.link}/api/stores`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                Authorization: `Bearer ${tokenUsr}`
            }
        });

        const data = await response.json();
        console.log("Traer todas las agencias: ", data);
        console.log("response: ", response);

        if(response.ok) {
            dispatch({
                type: getAllStores,
                payload: data.store,
                cargando: false
            });
        }
        else{
            dispatch({
                type: errorStore,
                error: data.message,
                cargando: false
            });
        }

    } catch (error) {
        console.error(error);
        dispatch({
            type: errorStore,
            error: error.message,
            cargando: false
        });
    }
};

export const getSearchStores = (search, token) => async dispatch => {
    dispatch({
        type: loadingStore
    });

    try {
        let dataForm = "_method=" + encodeURIComponent("POST");
        dataForm += "&search=" + encodeURIComponent(search);
        //console.log("form contacts:", dataForm);
        const response = await fetch(`${apiUrl.link}/api/stores`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                Authorization: `Bearer ${token}`,
            },
            body: dataForm
        });

        const data = await response.json();
        //console.log("Buscarlas agencias: ", data);
        //console.log("response: ", response);
        if(response.ok) {
            dispatch({
                type: getStores,
                payload: data.store,
                cargando: false
            });
        }else{
            dispatch({
                type: errorStore,
                error: data.message,
                cargando: false
            });
        }

    } catch (error) {
        dispatch({
            type: errorStore,
            error: error.message,
            cargando: false
        });
    }
};
